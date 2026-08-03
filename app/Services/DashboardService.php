<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Court;
use App\Models\TimeSlot;
use Illuminate\Database\Eloquent\Collection;

class DashboardService
{
    /**
     * Retrieve courts and their corresponding primary IDs for an owner.
     */
    public function getOwnerCourtsAndIds(int $ownerId): array
    {
        $courts = Court::where('owner_id', $ownerId)->get();
        return [$courts, $courts->pluck('id')];
    }

    /**
     * Fetch all bookings associated with given court IDs with customizable relations.
     */
    public function getOwnerBookings(iterable $courtIds, array $additionalRelations = []): Collection
    {
        return Booking::whereIn('court_id', $courtIds)
            ->with(array_merge(['court', 'customer', 'timeSlot'], $additionalRelations))
            ->latest()
            ->get();
    }

    /**
     * Calculate percentage rate of court schedule utilization.
     */
    public function calculateUtilization(int $totalCourts, int $activeCount): int
    {
        if ($totalCourts <= 0) {
            return 0;
        }

        return min(round(($activeCount / ($totalCourts * 4)) * 100), 100);
    }

    /**
     * Resolve the most frequently booked court's display name.
     */
    public function resolvePopularCourtName(Collection $bookings, Collection $courts): string
    {
        $topBooking = $bookings->groupBy('court_id')->sortByDesc->count()->first();

        if ($topBooking && $topBooking->first()?->court) {
            return $topBooking->first()->court->name;
        }

        return $courts->first()?->name ?? 'Your Court';
    }

    /**
     * Aggregate all data required for the main Dashboard view.
     */
    public function getDashboardData(int $ownerId): array
    {
        [$courts, $courtIds] = $this->getOwnerCourtsAndIds($ownerId);
        $bookings = $this->getOwnerBookings($courtIds);

        $totalRevenue = $bookings->where('status', 'confirmed')->sum('total_amount');
        $activeBookingsCount = $bookings->whereIn('status', ['confirmed', 'pending'])->count();

        return [
            'courts' => $courts,
            'bookings' => $bookings,
            'totalRevenue' => $totalRevenue,
            'activeBookingsCount' => $activeBookingsCount,
            'courtUtilization' => $this->calculateUtilization($courts->count(), $activeBookingsCount),
        ];
    }

    /**
     * Aggregate all data required for the Bookings management page.
     */
    public function getBookingsManagementData(int $ownerId): array
    {
        [$courts, $courtIds] = $this->getOwnerCourtsAndIds($ownerId);
        $bookings = $this->getOwnerBookings($courtIds, ['payment']);

        $totalRequests = $bookings->count();
        $pendingToday = $bookings->where('status', 'pending')->count();
        $confirmedCount = $bookings->where('status', 'confirmed')->count();
        $revenueProjection = $bookings->whereIn('status', ['confirmed', 'completed'])->sum('total_amount');

        $upcomingSlots = TimeSlot::whereIn('court_id', $courtIds)
            ->with('court') 
            ->orderBy('start_time', 'asc')
            ->take(3)
            ->get();

        return [
            'bookings' => $bookings,
            'totalRequests' => $totalRequests,
            'pendingToday' => $pendingToday,
            'courtUtilization' => $this->calculateUtilization($courts->count(), $confirmedCount),
            'revenueProjection' => $revenueProjection,
            'popularCourt' => $this->resolvePopularCourtName($bookings, $courts),
            'upcomingSlots' => $upcomingSlots,
        ];
    }
    /**
     * Aggregate all data required for the calendar schedule page.
     */
    public function getCalendarData(int $ownerId): array
    {
        [$courts, $courtIds] = $this->getOwnerCourtsAndIds($ownerId);

        $bookings = Booking::whereIn('court_id', $courtIds)
            ->where('status', '!=', 'cancelled')
            ->with(['court', 'customer', 'timeSlot'])
            ->get();

        return [
            'courts' => $courts,
            'bookings' => $bookings,
        ];
    }
}
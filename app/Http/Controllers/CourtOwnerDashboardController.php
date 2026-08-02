<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Court;
use App\Models\TimeSlot;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Response;
use Inertia\Inertia;

class CourtOwnerDashboardController extends Controller
{
    /**
     * Display the Court Owner Dashboard.
     */
    public function index(): Response
    {
        [$courts, $courtIds] = $this->getOwnerCourtsAndIds();
        $bookings = $this->getOwnerBookings($courtIds);

        $totalRevenue = $bookings->where('status', 'confirmed')->sum('total_amount');
        $activeBookingsCount = $bookings->whereIn('status', ['confirmed', 'pending'])->count();

        return Inertia::render('Dashboard', [
            'recentBookings' => $bookings,
            'courts' => $courts,
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'activeBookings' => $activeBookingsCount,
                'courtUtilization' => $this->calculateUtilization($courts->count(), $activeBookingsCount),
            ],
        ]);
    }

    /**
     * Display the full Bookings Management page.
     */
    public function bookingsIndex(): Response
    {
        [$courts, $courtIds] = $this->getOwnerCourtsAndIds();
        $bookings = $this->getOwnerBookings($courtIds, ['payment']);

        $totalRequests = $bookings->count();
        $pendingToday = $bookings->where('status', 'pending')->count();
        $confirmedCount = $bookings->where('status', 'confirmed')->count();
        $revenueProjection = $bookings->whereIn('status', ['confirmed', 'completed'])->sum('total_amount');

        return Inertia::render('CourtOwner/Bookings', [
            'bookings' => $bookings,
            'stats' => [
                'totalRequests' => $totalRequests,
                'pendingToday' => $pendingToday,
                'courtUtilization' => $this->calculateUtilization($courts->count(), $confirmedCount),
                'revenueProjection' => $revenueProjection,
            ],
            'insights' => [
                'popularCourt' => $this->resolvePopularCourtName($bookings, $courts),
                'pendingCount' => $pendingToday,
                'upcomingSlots' => TimeSlot::whereIn('court_id', $courtIds)
                    ->orderBy('start_time', 'asc')
                    ->take(3)
                    ->get(),
            ],
        ]);
    }

    /**
     * Retrieve courts and their corresponding primary IDs for the current owner.
     */
    private function getOwnerCourtsAndIds(): array
    {
        $courts = Court::where('owner_id', auth()->id())->get();
        return [$courts, $courts->pluck('id')];
    }

    /**
     * Fetch all bookings associated with given court IDs.
     */
    private function getOwnerBookings(iterable $courtIds, array $additionalRelations = []): Collection
    {
        return Booking::whereIn('court_id', $courtIds)
            ->with(array_merge(['court', 'customer', 'timeSlot'], $additionalRelations))
            ->latest()
            ->get();
    }

    /**
     * Calculate percentage rate of court schedule utilization.
     */
    private function calculateUtilization(int $totalCourts, int $activeCount): int
    {
        if ($totalCourts <= 0) {
            return 0;
        }

        return min(round(($activeCount / ($totalCourts * 4)) * 100), 100);
    }

    /**
     * Resolve the most frequently booked court's display name.
     */
    private function resolvePopularCourtName(Collection $bookings, Collection $courts): string
    {
        $topBooking = $bookings->groupBy('court_id')->sortByDesc->count()->first();

        if ($topBooking && $topBooking->first()?->court) {
            return $topBooking->first()->court->name;
        }

        return $courts->first()?->name ?? 'Your Court';
    }
    public function calendarIndex()
    {
        [$courts, $courtIds] = $this->getOwnerCourtsAndIds();

        $bookings = Booking::whereIn('court_id', $courtIds)
            ->where('status', '!=', 'cancelled')
            ->with(['court', 'customer', 'timeSlot'])
            ->get();

        return Inertia::render('CourtOwner/Calendar', [
            'courts' => $courts,
            'bookings' => $bookings,
        ]);
    }
}
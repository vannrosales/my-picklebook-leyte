<?php
namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Court;
use Inertia\Inertia;

class CourtOwnerDashboardController extends Controller
{
    public function index()
    {
        $ownerId = auth()->id();

        // Get all courts owned by the logged-in user
        $courts = Court::where('owner_id', $ownerId)->get();
        $courtIds = $courts->pluck('id');

        // Fetch bookings linked to those courts
        $bookings = Booking::whereIn('court_id', $courtIds)
            ->with(['court', 'customer', 'timeSlot'])
            ->latest()
            ->get();

        // Calculate Real Stats
        $totalRevenue = $bookings->where('status', 'confirmed')->sum('total_amount');
        $activeBookingsCount = $bookings->whereIn('status', ['confirmed', 'pending'])->count();
        
        $totalCourts = count($courtIds);
        $courtUtilization = $totalCourts > 0 ? min(round(($activeBookingsCount / ($totalCourts * 4)) * 100), 100) : 0;

        return Inertia::render('Dashboard', [
            'recentBookings' => $bookings,
            'courts' => $courts, // Pass real courts data
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'activeBookings' => $activeBookingsCount,
                'courtUtilization' => $courtUtilization,
            ]
        ]);
    }
}
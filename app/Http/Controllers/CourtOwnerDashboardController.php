<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Response;
use Inertia\Inertia;

class CourtOwnerDashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * Display the Court Owner Dashboard.
     */
    public function index(): Response
    {
        $ownerId = auth()->id();
        $data = $this->dashboardService->getDashboardData($ownerId);

        return Inertia::render('Dashboard', [
            'recentBookings' => $data['bookings'],
            'courts' => $data['courts'],
            'stats' => [
                'totalRevenue' => $data['totalRevenue'],
                'activeBookings' => $data['activeBookingsCount'],
                'courtUtilization' => $data['courtUtilization'],
            ],
        ]);
    }

    /**
     * Display the full Bookings Management page.
     */
    public function bookingsIndex(): Response
    {
        $ownerId = auth()->id();
        $data = $this->dashboardService->getBookingsManagementData($ownerId);

        return Inertia::render('CourtOwner/Bookings', [
            'bookings' => $data['bookings'],
            'stats' => [
                'totalRequests' => $data['totalRequests'],
                'pendingToday' => $data['pendingToday'],
                'courtUtilization' => $data['courtUtilization'],
                'revenueProjection' => $data['revenueProjection'],
            ],
            'insights' => [
                'popularCourt' => $data['popularCourt'],
                'pendingCount' => $data['pendingToday'],
                'upcomingSlots' => $data['upcomingSlots'],
            ],
        ]);
    }

    /**
     * Display the Calendar Schedule management view.
     */
    public function calendarIndex(): Response
    {
        $ownerId = auth()->id();
        $data = $this->dashboardService->getCalendarData($ownerId);

        return Inertia::render('CourtOwner/Calendar', [
            'courts' => $data['courts'],
            'bookings' => $data['bookings'],
        ]);
    }
}
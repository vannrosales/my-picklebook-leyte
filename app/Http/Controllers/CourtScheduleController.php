<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourtScheduleRequest;
use App\Services\CourtScheduleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class CourtScheduleController extends Controller
{
    protected CourtScheduleService $scheduleService;

    public function __construct(CourtScheduleService $scheduleService)
    {
        $this->scheduleService = $scheduleService;
    }

    /**
     * Display the operating schedules management page for the owner's courts.
     */
    public function index(Request $request): Response
    {
        $ownerId = auth()->id();
        $selectedCourtId = $request->input('court_id');

        $data = $this->scheduleService->getScheduleManagementData($ownerId, $selectedCourtId);

        return Inertia::render('CourtOwner/Schedules', [
            'courts' => $data['courts'],
            'selectedCourtId' => $data['selectedCourtId'],
            'daysOfWeek' => $data['daysOfWeek'],
            'schedules' => $data['schedules'],
        ]);
    }

    /**
     * Store or update operating schedules for a specific court.
     */
    public function storeOrUpdate(StoreCourtScheduleRequest $request): RedirectResponse
    {
        $this->scheduleService->saveSchedules(
            $request->validated('court_id'),
            $request->validated('schedules')
        );

        return redirect()->back()->with('success', 'Operating schedules updated successfully!');
    }
}
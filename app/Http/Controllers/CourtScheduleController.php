<?php

namespace App\Http\Controllers;

use App\Models\Court;
use App\Models\CourtSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourtScheduleController extends Controller
{
    
    public function index(Request $request)
    {
        $ownerId = auth()->id();
        $courts = Court::where('owner_id', $ownerId)->get();
        
        $selectedCourtId = $request->input('court_id', $courts->first()?->id);
        
        $schedules = [];
        if ($selectedCourtId) {
            $schedules = CourtSchedule::where('court_id', $selectedCourtId)->get()->keyBy('day_of_week');
        }

        $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return Inertia::render('CourtOwner/Schedules', [
            'courts' => $courts,
            'selectedCourtId' => $selectedCourtId,
            'daysOfWeek' => $daysOfWeek,
            'schedules' => $schedules,
        ]);
    }

    
    public function storeOrUpdate(Request $request)
    {
        $validated = $request->validate([
            'court_id' => 'required|exists:courts,id',
            'schedules' => 'required|array',
            'schedules.*.day_of_week' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'schedules.*.is_open' => 'required|boolean',
            'schedules.*.opening_time' => 'nullable|required_if:schedules.*.is_open,true|date_format:H:i',
            'schedules.*.closing_time' => 'nullable|required_if:schedules.*.is_open,true|date_format:H:i|after:schedules.*.opening_time',
        ]);

        $courtId = $validated['court_id'];

        foreach ($validated['schedules'] as $dayData) {
            if ($dayData['is_open']) {
                CourtSchedule::updateOrCreate(
                    [
                        'court_id' => $courtId,
                        'day_of_week' => $dayData['day_of_week'],
                    ],
                    [
                        'opening_time' => $dayData['opening_time'],
                        'closing_time' => $dayData['closing_time'],
                    ]
                );
            } else {
                
                CourtSchedule::where('court_id', $courtId)
                    ->where('day_of_week', $dayData['day_of_week'])
                    ->delete();
            }
        }

        return redirect()->back()->with('success', 'Operating schedules updated successfully!');
    }
}
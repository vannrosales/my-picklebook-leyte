<?php

namespace App\Services;

use App\Models\Court;
use App\Models\CourtSchedule;
use Illuminate\Support\Facades\DB;

class CourtScheduleService
{
    /**
     * Fetch all data needed for the schedule management view.
     */
    public function getScheduleManagementData(int $ownerId, ?int $selectedCourtId = null): array
    {
        $courts = Court::where('owner_id', $ownerId)->get();

        // Fallback or ensure the selected court actually belongs to this owner
        $selectedCourtId = $courts->where('id', $selectedCourtId)->first()?->id 
            ?? $courts->first()?->id;

        $schedules = [];
        if ($selectedCourtId) {
            $schedules = CourtSchedule::where('court_id', $selectedCourtId)
                ->get()
                ->keyBy('day_of_week');
        }

        return [
            'courts' => $courts,
            'selectedCourtId' => $selectedCourtId,
            'daysOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'schedules' => $schedules,
        ];
    }

    /**
     * Atomically loop through and update or delete court schedules.
     */
    public function saveSchedules(int $courtId, array $schedulesData): void
    {
        DB::transaction(function () use ($courtId, $schedulesData) {
            foreach ($schedulesData as $dayData) {
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
        });
    }
}
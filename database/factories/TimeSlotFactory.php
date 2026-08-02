<?php

namespace Database\Factories;

use App\Models\Court;
use Illuminate\Database\Eloquent\Factories\Factory;

class TimeSlotFactory extends Factory
{
    public function definition(): array
    {
        return [
            'court_id' => Court::factory(),
            'date' => now()->format('Y-m-d'),
            'start_time' => '09:00:00',
            'end_time' => '10:00:00',
            'is_booked' => false,
        ];
    }
}
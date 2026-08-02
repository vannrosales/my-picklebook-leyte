<?php

namespace Database\Factories;

use App\Models\Court;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourtScheduleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'court_id' => Court::factory(),
            'day_of_week' => now()->format('l'),
            'opening_time' => '08:00:00',
            'closing_time' => '20:00:00',
        ];
    }
}
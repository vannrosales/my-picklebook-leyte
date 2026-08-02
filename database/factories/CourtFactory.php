<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourtFactory extends Factory
{
    public function definition(): array
    {
        return [
            'owner_id' => User::factory(),
            'name' => fake()->company() . ' Court',
            'description' => 'Standard pickleball court location in Tacloban',
            'surface_type' => 'Acrylic',
            'hourly_rate' => 350.00,
            'status' => 'available',
        ];
    }
}
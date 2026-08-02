<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'owner_id' => User::factory(),
            'tier_name' => 'Single Court',
            'monthly_price' => 550.00,
            'status' => 'active',
            'start_date' => now(),
            'end_date' => now()->addMonth(),
        ];
    }
}
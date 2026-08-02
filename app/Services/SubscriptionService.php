<?php

namespace App\Services;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class SubscriptionService
{
    /**
     * Return list of pre-defined subscription tiers.
     */
    public function getAvailableTiers(): array
    {
        return [
            ['name' => 'Single Court', 'price' => 550.00, 'features' => 'Basic scheduling dashboard, Manage 1 court listing'],
            ['name' => 'Dual Courts', 'price' => 1050.00, 'features' => 'Standard analytics, Manage up to 2 court listings'],
            ['name' => '3 Courts Tier', 'price' => 1550.00, 'features' => 'Advanced analytics, Manage up to 3 court listings'],
            ['name' => '4 Courts Tier', 'price' => 2050.00, 'features' => 'Comprehensive reporting, Manage up to 4 court listings'],
            ['name' => '5 Courts Tier', 'price' => 2550.00, 'features' => 'Multi-court dashboard, Manage up to 5 court listings'],
            ['name' => '6 Courts Tier', 'price' => 3050.00, 'features' => 'Advanced revenue tracking, Manage up to 6 court listings'],
            ['name' => '7 Courts Tier', 'price' => 3550.00, 'features' => 'Full enterprise analytics, Manage up to 7 court listings'],
            ['name' => '8 Courts Tier', 'price' => 4050.00, 'features' => 'Full enterprise analytics suite, Manage up to 8 court listings'],
        ];
    }

    /**
     * Create or activate a subscription for a user.
     */
    public function activateSubscription(User $user, array $data): Subscription
    {
        return Subscription::create([
            'owner_id' => $user->id,
            'tier_name' => $data['tier_name'],
            'monthly_price' => $data['monthly_price'],
            'status' => 'active',
            'start_date' => now(),
            'end_date' => now()->addMonth(),
        ]);
    }

    /**
     * Fetch the user's latest subscription record.
     */
    public function getLatestSubscription(User $user): ?Model
    {
        // Adjust to 'subscriptions()' or 'subscription()' based on your model relationship definition
        return $user->subscriptions()->latest()->first();
    }
}
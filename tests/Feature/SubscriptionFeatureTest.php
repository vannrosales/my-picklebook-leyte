<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriptionFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_court_owner_can_activate_subscription_tier()
    {
        $owner = User::factory()->create(['role' => 'court_owner']);

        $response = $this->actingAs($owner)->post(route('owner.subscription.store'), [
            'tier_name' => 'Single Court',
            'monthly_price' => 550.00,
        ]);

        $response->assertRedirect(route('court.listings'));
        $this->assertDatabaseHas('subscriptions', [
            'owner_id' => $owner->id,
            'tier_name' => 'Single Court',
            'status' => 'active',
        ]);
    }
}
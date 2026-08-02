<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Court;
use App\Models\Subscription;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CourtFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_court_owner_cannot_add_court_without_active_subscription()
    {
        $owner = User::factory()->create(['role' => 'court_owner']);

        $response = $this->actingAs($owner)->post(route('court.store'), [
            'name' => 'Skycourt',
            'surface_type' => 'Acrylic',
            'hourly_rate' => 400,
            'status' => 'available',
        ]);

        $response->assertRedirect(route('owner.subscription.create'));
    }

    public function test_court_owner_with_valid_subscription_can_add_court()
    {
        $owner = User::factory()->create(['role' => 'court_owner']);
        
        Subscription::factory()->create([
            'owner_id' => $owner->id,
            'tier_name' => 'Single Court',
            'status' => 'active',
        ]);

        $response = $this->actingAs($owner)->post(route('court.store'), [
            'name' => 'Skycourt',
            'surface_type' => 'Acrylic',
            'hourly_rate' => 400,
            'status' => 'available',
        ]);

        $response->assertRedirect(route('court.listings'));
        $this->assertDatabaseHas('courts', ['name' => 'Skycourt']);
    }
}
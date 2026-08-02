<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Court;
use App\Models\CourtSchedule;
use App\Models\TimeSlot;
use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_player_can_fetch_available_slots()
    {
        $player = User::factory()->create(['role' => 'customer']); // Create a player
        $owner = User::factory()->create(['role' => 'court_owner']);
        $court = Court::factory()->create(['owner_id' => $owner->id]);
        
        $today = now()->format('Y-m-d');
        $dayOfWeek = now()->format('l');

        CourtSchedule::factory()->create([
            'court_id' => $court->id,
            'day_of_week' => $dayOfWeek,
            'opening_time' => '08:00',
            'closing_time' => '10:00',
        ]);

        // Authenticate the user and send the JSON request
        $response = $this->actingAs($player)->getJson(route('courts.slots', ['court' => $court->id, 'date' => $today]));

        $response->assertStatus(200)
                ->assertJsonStructure(['court', 'date', 'day', 'slots']);
    }

    public function test_player_can_book_available_slot()
    {
        $player = User::factory()->create(['role' => 'customer']);
        $court = Court::factory()->create(['hourly_rate' => 500]);
        $slot = TimeSlot::factory()->create([
            'court_id' => $court->id,
            'is_booked' => false,
        ]);

        $response = $this->actingAs($player)->post(route('bookings.store'), [
            'court_id' => $court->id,
            'time_slot_id' => $slot->id,
            'payment_method' => 'gcash',
        ]);

        $response->assertRedirect(route('courts.browse'));
        $this->assertDatabaseHas('bookings', [
            'customer_id' => $player->id,
            'status' => 'confirmed',
        ]);
        $this->assertDatabaseHas('time_slots', [
            'id' => $slot->id,
            'is_booked' => true,
        ]);
    }
}
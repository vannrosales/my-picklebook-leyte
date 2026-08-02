<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register_as_customer(): void
    {
        $response = $this->post('/register', [
            'fullname' => 'Test User',
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone_number' => '09123456789',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'customer',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertAuthenticated();
        
        // Matches your controller's logic: customers redirect to player.dashboard
        $response->assertRedirect(route('player.dashboard', absolute: false));
    }

    public function test_court_owners_redirect_to_subscription_on_registration(): void
    {
        $response = $this->post('/register', [
            'fullname' => 'Court Owner User',
            'name' => 'Court Owner User',
            'email' => 'owner@example.com',
            'phone_number' => '09123456789',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'court_owner',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertAuthenticated();
        
        // Matches your controller's logic: court_owners redirect to subscription creation
        $response->assertRedirect(route('owner.subscription.create'));
    }
}
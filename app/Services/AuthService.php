<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    /**
     * Register a new user and trigger registration event.
     */
    public function registerUser(array $data): User
    {
        $user = User::create([
            'fullname' => $data['fullname'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'] ?? 'customer',
        ]);

        event(new Registered($user));

        Auth::login($user);

        return $user;
    }
    public function loginUser(array $credentials): string
    {
        if (! Auth::attempt($credentials, $credentials['remember'] ?? false)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $user = Auth::user();

        
        if ($user->role === 'court_owner') {
            return route('dashboard');
        }

        return route('player.dashboard');
    }
}
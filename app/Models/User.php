<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Subscription;
use App\Models\Court;
use App\Models\Booking; 

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'fullname',
        'phone_number',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function subscription()
    {
        return $this->hasOne(Subscription::class, 'owner_id', 'id');
    }

    /**
     * Get all subscription records for the court owner.
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, 'owner_id', 'id');
    }
    public function courts()
    {
        return $this->hasMany(Court::class, 'owner_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'customer_id');
    }
}

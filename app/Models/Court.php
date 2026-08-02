<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Court extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id', 'name', 'description', 'surface_type', 'hourly_rate', 'status'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function schedules()
    {
        return $this->hasMany(CourtSchedule::class);
    }

    public function timeSlots()
    {
        return $this->hasMany(TimeSlot::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
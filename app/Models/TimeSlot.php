<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'court_id', 'date', 'start_time', 'end_time', 'is_booked'
    ];

    protected $casts = [
        'is_booked' => 'boolean',
        'date' => 'date',
    ];

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function booking()
    {
        return $this->hasOne(Booking::class);
    }
}   
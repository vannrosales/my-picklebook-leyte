<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourtSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'court_id', 'day_of_week', 'opening_time', 'closing_time'
    ];

    public function court()
    {
        return $this->belongsTo(Court::class);
    }
}
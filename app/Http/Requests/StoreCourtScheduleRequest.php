<?php

namespace App\Http\Requests;

use App\Models\Court;
use Illuminate\Foundation\Http\FormRequest;

class StoreCourtScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Ensure the authenticated user owns the court they are updating schedules for
        $courtId = $this->input('court_id');
        
        return Court::where('id', $courtId)
            ->where('owner_id', auth()->id())
            ->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'court_id' => 'required|exists:courts,id',
            'schedules' => 'required|array',
            'schedules.*.day_of_week' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'schedules.*.is_open' => 'required|boolean',
            'schedules.*.opening_time' => 'nullable|required_if:schedules.*.is_open,true|date_format:H:i',
            'schedules.*.closing_time' => 'nullable|required_if:schedules.*.is_open,true|date_format:H:i|after:schedules.*.opening_time',
        ];
    }
}
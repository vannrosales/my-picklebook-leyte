<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourtRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'court_owner';
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'surface_type' => 'required|string|max:255',
            'hourly_rate' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ];
    }
}
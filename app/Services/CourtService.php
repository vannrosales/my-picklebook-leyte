<?php

namespace App\Services;

use App\Models\Court;
use App\Models\User;
use Illuminate\Support\Collection;

class CourtService
{
    /**
     * Get formatted courts belonging to a specific owner.
     */
    public function getOwnerCourts(User $user): Collection
    {
        $badgeColors = [
            'available' => 'bg-[#22C55E]',
            'maintenance' => 'bg-[#FF8B7C]',
            'closed' => 'bg-gray-400',
        ];

        return Court::where('owner_id', $user->id)
            ->withCount('bookings')
            ->latest()
            ->get()
            ->map(fn ($court) => [
                'id' => $court->id,
                'name' => $court->name,
                'description' => $court->description,
                'surfaceType' => $court->surface_type,
                'hourly_rate' => $court->hourly_rate,
                'rate' => '₱' . number_format($court->hourly_rate, 2) . ' / hr',
                'utilization' => '85%',
                'status' => strtolower($court->status),
                'statusBadgeColor' => $badgeColors[strtolower($court->status)] ?? 'bg-[#22C55E]',
                'image' => 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80',
            ]);
    }

    /**
     * Get formatted courts for player browsing.
     */
    public function getPublicBrowseCourts(): Collection
    {
        return Court::with('owner')
            ->latest()
            ->get()
            ->map(fn ($court) => [
                'id' => $court->id,
                'name' => $court->name,
                'type' => $court->surface_type,
                'location' => $court->description ?? 'Tacloban City',
                'price' => '₱' . number_format($court->hourly_rate, 0),
                'hourly_rate' => $court->hourly_rate,
                'rating' => '4.8',
                'status' => $court->status,
                'img' => 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
            ]);
    }

    /**
     * Validate if an owner can add more courts based on active subscription limits.
     */
    public function validateCourtCreationLimit(User $user): ?string
    {
        $subscription = $user->subscriptions()->where('status', 'active')->latest()->first();

        if (! $subscription) {
            return 'You need an active subscription to add courts.';
        }

        $tierName = strtolower($subscription->tier_name);
        $allowedLimit = 1;

        if (str_contains($tierName, 'single')) {
            $allowedLimit = 1;
        } elseif (str_contains($tierName, 'dual')) {
            $allowedLimit = 2;
        } elseif (preg_match('/(\d+)\s*courts?/i', $subscription->tier_name, $matches)) {
            $allowedLimit = (int) $matches[1];
        }

        if ($user->courts()->count() >= $allowedLimit) {
            return "Your current plan ({$subscription->tier_name}) only allows up to {$allowedLimit} court(s). Please upgrade your tier to add more!";
        }

        return null;
    }

    /**
     * Create a new court record.
     */
    public function createCourt(User $user, array $data): Court
    {
        return $user->courts()->create([
            'owner_id' => $user->id,
            ...$data,
        ]);
    }

    /**
     * Update an existing court record.
     */
    public function updateCourt(Court $court, array $data): bool
    {
        return $court->update($data);
    }

    /**
     * Delete a court record.
     */
    public function deleteCourt(Court $court): ?bool
    {
        return $court->delete();
    }
}
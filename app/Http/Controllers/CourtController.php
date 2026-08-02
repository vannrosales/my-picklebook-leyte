<?php

namespace App\Http\Controllers;

use App\Models\Court;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

class CourtController extends Controller
{
    /**
     * Display the court owner's management listings.
     */
    public function index(): Response
    {
        $badgeColors = [
            'available' => 'bg-[#22C55E]',
            'maintenance' => 'bg-[#FF8B7C]',
            'closed' => 'bg-gray-400',
        ];

        $courts = Court::where('owner_id', auth()->id())
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

        return Inertia::render('CourtOwner/Courts', [
            'courts' => $courts,
        ]);
    }

    /**
     * Display the public / player-facing court browse catalog.
     */
    public function browse(): Response
    {
        
        if (auth()->user()->role !== 'customer') {
            abort(404, 'Unauthorized action.');
        }

        $courts = Court::with('owner')
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

        return Inertia::render('Player/BrowseCourts', [
            'courts' => $courts,
        ]);
    }

    /**
     * Store a newly created court based on owner subscription tiers.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = auth()->user();

        $subscription = $user->subscriptions()->where('status', 'active')->latest()->first();

        if (! $subscription) {
            return redirect()->route('owner.subscription.create')
                ->with('error', 'You need an active subscription to add courts.');
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
            return redirect()->route('owner.subscription.create')
                ->with('error', "Your current plan ({$subscription->tier_name}) only allows up to {$allowedLimit} court(s). Please upgrade your tier to add more!");
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'surface_type' => 'required|string|max:255',
            'hourly_rate' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        $user->courts()->create([
            'owner_id' => $user->id,
            ...$validated,
        ]);

        return redirect()->route('court.listings')->with('success', 'Court added successfully!');
    }

    /**
     * Update an existing court.
     */
    public function update(Request $request, Court $court): RedirectResponse
    {
        if ($court->owner_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'surface_type' => 'required|string|max:100',
            'hourly_rate' => 'required|numeric|min:0',
            'status' => 'required|in:available,maintenance,closed',
        ]);

        $court->update($validated);

        return redirect()->route('court.listings')->with('success', 'Court updated successfully!');
    }

    /**
     * Delete an existing court.
     */
    public function destroy(Court $court): RedirectResponse
    {
        if ($court->owner_id !== auth()->id()) {
            abort(403);
        }

        $court->delete();

        return redirect()->route('court.listings')->with('success', 'Court deleted successfully!');
    }
}
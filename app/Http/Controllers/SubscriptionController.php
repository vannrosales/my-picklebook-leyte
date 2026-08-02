<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class SubscriptionController extends Controller
{
    public function create()
    {
        return Inertia::render('CourtOwner/Subscription', [
            'tiers' => [
                ['name' => 'Single Court', 'price' => 550.00, 'features' => 'Basic scheduling dashboard, Manage 1 court listing'],
                ['name' => 'Dual Courts', 'price' => 1050.00, 'features' => 'Standard analytics, Manage up to 2 court listings'],
                ['name' => '3 Courts Tier', 'price' => 1550.00, 'features' => 'Advanced analytics, Manage up to 3 court listings'],
                ['name' => '4 Courts Tier', 'price' => 2050.00, 'features' => 'Comprehensive reporting, Manage up to 4 court listings'],
                ['name' => '5 Courts Tier', 'price' => 2550.00, 'features' => 'Multi-court dashboard, Manage up to 5 court listings'],
                ['name' => '6 Courts Tier', 'price' => 3050.00, 'features' => 'Advanced revenue tracking, Manage up to 6 court listings'],
                ['name' => '7 Courts Tier', 'price' => 3550.00, 'features' => 'Full enterprise analytics, Manage up to 7 court listings'],
                ['name' => '8 Courts Tier', 'price' => 4050.00, 'features' => 'Full enterprise analytics suite, Manage up to 8 court listings'],
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tier_name' => 'required|string|max:255',
            'monthly_price' => 'required|numeric|min:0',
        ]);

        Subscription::create([
            'owner_id' => auth()->id(),
            'tier_name' => $validated['tier_name'],
            'monthly_price' => $validated['monthly_price'],
            'status' => 'active',
            'start_date' => now(),
            'end_date' => now()->addMonth(),
        ]);

        return redirect()->route('court.listings')->with('success', 'Subscription activated successfully!');
    }
    public function show()
    {
        $subscription = auth()->user()->subscription()->latest()->first();

        return Inertia::render('CourtOwner/SubscriptionView', [
            'currentSubscription' => $subscription,
        ]);
    }
}
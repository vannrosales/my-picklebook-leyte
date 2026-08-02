<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Services\SubscriptionService;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    protected SubscriptionService $subscriptionService;

    public function __construct(SubscriptionService $subscriptionService)
    {
        $this->subscriptionService = $subscriptionService;
    }

    /**
     * Display the available subscription tiers page.
     */
    public function create(): Response
    {
        return Inertia::render('CourtOwner/Subscription', [
            'tiers' => $this->subscriptionService->getAvailableTiers(),
        ]);
    }

    /**
     * Store and activate a newly chosen subscription plan.
     */
    public function store(StoreSubscriptionRequest $request): RedirectResponse
    {
        $this->subscriptionService->activateSubscription(
            auth()->user(),
            $request->validated()
        );

        return redirect()->route('court.listings')->with('success', 'Subscription activated successfully!');
    }

    /**
     * Display the current active subscription details view.
     */
    public function show(): Response
    {
        $subscription = $this->subscriptionService->getLatestSubscription(auth()->user());

        return Inertia::render('CourtOwner/SubscriptionView', [
            'currentSubscription' => $subscription,
        ]);
    }
}
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOwnerIsSubscribed
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if the user is a court owner
        if ($user && ($user->role === 'owner' || $user->role === 'court_owner')) {
            
            // Check if they have an active subscription
            $hasActiveSub = $user->subscriptions()
                ->where('status', 'active')
                ->where('end_date', '>=', now())
                ->exists();

            // If they don't have an active sub, bounce them to the subscription page
            if (!$hasActiveSub && !$request->routeIs('owner.subscription*')) {
                return redirect()->route('owner.subscription.create')
                    ->with('error', 'Please activate a subscription plan to access court management tools.');
            }
        }

        return $next($request);
    }
}
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
{
    $user = $request->user();
    $hasActiveSubscription = false;

    if ($user && $user->role === 'owner') {
        $hasActiveSubscription = $user->subscriptions()->where('status', 'active')->exists();
    }

    return [
        ...parent::share($request),
        'auth' => [
            'user' => $user,
            'has_active_subscription' => $hasActiveSubscription,
        ],
    ];
}
}

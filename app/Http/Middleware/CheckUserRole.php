<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        
        if ($user->role !== $role) {
            if ($user->role === 'court_owner') {
                return redirect()->route('dashboard');
            }
            return redirect()->route('player.dashboard');
        }

        return $next($request);
    }
}
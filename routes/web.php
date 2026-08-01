<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/browse-courts', function () {
    return Inertia::render('Courts/Browse');
})->name('courts.browse');

// Authenticated & Verified Routes Group
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Court Owner Only Dashboard
    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'customer') {
            return redirect()->route('player.dashboard');
        }
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/court/bookings', function () {
        if (auth()->user()->role === 'customer') {
            return redirect()->route('player.dashboard');
        }
        return Inertia::render('CourtOwner/Bookings');
    })->name('court.bookings');

    // Player / Customer Only Dashboard
    Route::get('/player-dashboard', function () {
        if (auth()->user()->role === 'court_owner') {
            return redirect()->route('dashboard');
        }
        return Inertia::render('Player/Dashboard');
    })->name('player.dashboard');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
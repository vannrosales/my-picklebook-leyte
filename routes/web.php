<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\CourtScheduleController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Middleware\EnsureOwnerIsSubscribed; 
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourtOwnerDashboardController;
use Inertia\Inertia;

// Public Welcome Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

// Public Court Browse & Booking Preview Routes
Route::get('/browse-courts', [CourtController::class, 'browse'])->name('courts.browse');
Route::get('/public/courts', [CourtController::class, 'publicIndex'])->name('courts.public.index');
Route::get('/courts/{court}/slots', [BookingController::class, 'getAvailableSlots'])->name('courts.slots');

// Authenticated & Verified Routes Group
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Court Owner Dashboard
    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'customer') {
            return redirect()->route('player.dashboard');
        }
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Player / Customer Dashboard
    Route::get('/player-dashboard', function () {
        if (auth()->user()->role === 'court_owner') {
            return redirect()->route('dashboard');
        }
        return Inertia::render('Player/Dashboard');
    })->name('player.dashboard');

    Route::get('/dashboard', [CourtOwnerDashboardController::class, 'index'])->name('dashboard');

    Route::get('/player/bookings', [BookingController::class, 'playerIndex'])->name('player.bookings');
    Route::delete('/player/bookings/{booking}', [BookingController::class, 'destroyBooking'])->name('player.bookings.destroy');

    // Subscription Management (Unrestricted so unsubscribed owners can pay)
    Route::get('/owner/subscription', [SubscriptionController::class, 'create'])->name('owner.subscription.create');
    Route::post('/owner/subscription', [SubscriptionController::class, 'store'])->name('owner.subscription.store');
    

    // Protected Court Owner Routes (Requires Active Subscription Class)
    Route::middleware([EnsureOwnerIsSubscribed::class])->group(function () {
        Route::get('/court/bookings', function () {
            if (auth()->user()->role === 'customer') {
                return redirect()->route('player.dashboard');
            }
            return Inertia::render('CourtOwner/Bookings');
        })->name('court.bookings');

        Route::get('/court/listings', [CourtController::class, 'index'])->name('court.listings');
        Route::post('/court/listings', [CourtController::class, 'store'])->name('court.store');
        Route::put('/court/listings/{court}', [CourtController::class, 'update'])->name('court.update');
        Route::delete('/court/listings/{court}', [CourtController::class, 'destroy'])->name('court.destroy');
        
        Route::get('/court/schedules', [CourtScheduleController::class, 'index'])->name('court.schedules');
        Route::post('/court/schedules', [CourtScheduleController::class, 'storeOrUpdate'])->name('court.schedules.store');
    });
    
    // Submit final booking (Requires authentication)
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
});

// Profile Management Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
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

// Public Guest Routes (Preview only)
Route::get('/public/courts', [CourtController::class, 'publicIndex'])->name('courts.public.index');

// Authenticated & Verified Routes Group
Route::middleware(['auth', 'verified'])->group(function () {

    // ==========================================
    // 1. CUSTOMER / PLAYER EXCLUSIVE ROUTES
    // ==========================================
    Route::middleware(['role:customer'])->group(function () {
        Route::get('/player-dashboard', fn () => Inertia::render('Player/Dashboard'))->name('player.dashboard');
        Route::get('/browse-courts', [CourtController::class, 'browse'])->name('courts.browse');
        Route::get('/courts/{court}/slots', [BookingController::class, 'getAvailableSlots'])->name('courts.slots');
        Route::get('/player/bookings', [BookingController::class, 'playerIndex'])->name('player.bookings');
        Route::delete('/player/bookings/{booking}', [BookingController::class, 'destroyBooking'])->name('player.bookings.destroy');
        Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    });

    // ==========================================
    // 2. COURT OWNER EXCLUSIVE ROUTES
    // ==========================================
    Route::middleware(['role:court_owner'])->group(function () {
        
        // Unrestricted owner routes (like subscription payment creation)
        Route::get('/owner/subscription', [SubscriptionController::class, 'create'])->name('owner.subscription.create');
        Route::post('/owner/subscription', [SubscriptionController::class, 'store'])->name('owner.subscription.store');
        Route::get('/owner/subscription/view', [SubscriptionController::class, 'show'])->name('owner.subscription.show');

        // Protected Court Owner Routes (Requires Active Subscription)
        Route::middleware([EnsureOwnerIsSubscribed::class])->group(function () {
            Route::get('/dashboard', [CourtOwnerDashboardController::class, 'index'])->name('dashboard');
            Route::get('/court/bookings', [CourtOwnerDashboardController::class, 'bookingsIndex'])->name('court.bookings');
            Route::get('/court/calendar', [CourtOwnerDashboardController::class, 'calendarIndex'])->name('court.calendar');

            Route::get('/court/listings', [CourtController::class, 'index'])->name('court.listings');
            Route::post('/court/listings', [CourtController::class, 'store'])->name('court.store');
            Route::put('/court/listings/{court}', [CourtController::class, 'update'])->name('court.update');
            Route::delete('/court/listings/{court}', [CourtController::class, 'destroy'])->name('court.destroy');
            
            Route::get('/court/schedules', [CourtScheduleController::class, 'index'])->name('court.schedules');
            Route::post('/court/schedules', [CourtScheduleController::class, 'storeOrUpdate'])->name('court.schedules.store');
        });
    });
});

// Profile Management Routes (Accessible by both roles)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
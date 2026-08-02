<?php

namespace App\Http\Controllers;

use App\Models\Court;
use App\Models\TimeSlot;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Services\BookingService;
use Inertia\Inertia;
use Exception;

class BookingController extends Controller
{
    protected BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    /**
     * Fetch or generate available time slots for a specific court and date.
     */
    public function getAvailableSlots(Request $request, Court $court)
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:today',
        ]);

        $date = $request->input('date');

        try {
            $data = $this->bookingService->getAvailableSlotsForDate($court, $date);

            return response()->json([
                'court' => $court->name,
                'date' => $date,
                'day' => $data['dayOfWeek'],
                'slots' => $data['slots']
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'slots' => []
            ], 200);
        }
    }

    /**
     * Store a new court booking and handle mock payment.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'court_id' => 'required|exists:courts,id',
            'time_slot_id' => 'required|exists:time_slots,id',
            'payment_method' => 'required|in:gcash,credit_card,debit_card',
        ]);

        try {
            $this->bookingService->createBooking(
                auth()->user(),
                $validated['court_id'],
                $validated['time_slot_id'],
                $validated['payment_method']
            );

            return redirect()->route('courts.browse')->with('success', 'Court booked successfully!');
        } catch (Exception $e) {
            return back()->withErrors(['time_slot_id' => $e->getMessage()]);
        }
    }

    /**
     * Display a listing of bookings for the authenticated player.
     */
    public function playerIndex()
    {
        $bookings = auth()->user()->bookings()
            ->with(['court', 'timeSlot'])
            ->latest()
            ->get();

        return Inertia::render('Player/Bookings', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Cancel an existing booking and free up the time slot.
     */
    public function destroyBooking($id)
    {
        $booking = Booking::where('id', $id)
            ->where('customer_id', auth()->id())
            ->firstOrFail();

        if (in_array($booking->status, ['cancelled', 'completed'])) {
            return back()->with('error', 'This booking can no longer be cancelled.');
        }

        try {
            $this->bookingService->cancelBooking($booking);

            return back()->with('success', 'Booking cancelled successfully. The court slot is now open for other players.');
        } catch (Exception $e) {
            return back()->with('error', 'Failed to cancel the booking. Please try again later.');
        }
    }
}
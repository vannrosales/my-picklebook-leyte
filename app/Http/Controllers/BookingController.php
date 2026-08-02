<?php

namespace App\Http\Controllers;

use App\Models\Court;
use App\Models\TimeSlot;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookingController extends Controller
{
    
    public function getAvailableSlots(Request $request, Court $court)
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:today',
        ]);

        $date = $request->input('date');
        $dayOfWeek = Carbon::parse($date)->format('l'); 

        
        $schedule = $court->schedules()->where('day_of_week', $dayOfWeek)->first();

        if (!$schedule) {
            return response()->json([
                'message' => 'The court is closed on this day.',
                'slots' => []
            ], 200);
        }

        
        $opening = Carbon::parse($schedule->opening_time);
        $closing = Carbon::parse($schedule->closing_time);

        while ($opening->copy()->addHour()->lte($closing)) {
            $startTime = $opening->format('H:i:s');
            $endTime = $opening->copy()->addHour()->format('H:i:s');

            TimeSlot::firstOrCreate([
                'court_id' => $court->id,
                'date' => $date,
                'start_time' => $startTime,
            ], [
                'end_time' => $endTime,
                'is_booked' => false,
            ]);

            $opening->addHour();
        }

        
        $slots = TimeSlot::where('court_id', $court->id)
            ->where('date', $date)
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'court' => $court->name,
            'date' => $date,
            'day' => $dayOfWeek,
            'slots' => $slots
        ]);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'court_id' => 'required|exists:courts,id',
            'time_slot_id' => 'required|exists:time_slots,id',
            'payment_method' => 'required|in:gcash,credit_card,debit_card',
        ]);

        $timeSlot = TimeSlot::findOrFail($validated['time_slot_id']);

        
        if ($timeSlot->is_booked) {
            return back()->withErrors(['time_slot_id' => 'This time slot has already been booked. Please select another slot.']);
        }

        $court = Court::findOrFail($validated['court_id']);

        
        DB::transaction(function () use ($validated, $timeSlot, $court) {
            
            $timeSlot->update(['is_booked' => true]);

            
            $booking = Booking::create([
                'customer_id' => auth()->id(),
                'court_id' => $court->id,
                'time_slot_id' => $timeSlot->id,
                'total_amount' => $court->hourly_rate,
                'status' => 'confirmed',
            ]);

            
            Payment::create([
                'user_id' => auth()->id(),
                'booking_id' => $booking->id,
                'payment_method' => $validated['payment_method'],
                'transaction_reference' => 'TXN-' . strtoupper(uniqid()),
                'amount' => $court->hourly_rate,
                'payment_status' => 'success',
                'paid_at' => now(),
            ]);
        });

        return redirect()->route('courts.browse')->with('success', 'Court booked successfully!');
    }

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

    public function destroyBooking($id)
    {
        
        $booking = Booking::where('id', $id)
            ->where('customer_id', auth()->id())
            ->firstOrFail();

        
        if (in_array($booking->status, ['cancelled', 'completed'])) {
            return back()->with('error', 'This booking can no longer be cancelled.');
        }

        try {
            DB::transaction(function () use ($booking) {
                // 1. Mark the booking as cancelled
                $booking->update(['status' => 'cancelled']);

                // 2. Release the corresponding time slot back to available (is_booked = 0)
                if ($booking->time_slot_id) {
                    \App\Models\TimeSlot::where('id', $booking->time_slot_id)->update(['is_booked' => 0]);
                } 
                
                // Fallback: If your app tracks slots via schedule/date/time columns directly instead of a time_slot_id
                elseif (isset($booking->court_id, $booking->booking_date, $booking->start_time)) {
                    \App\Models\CourtSchedule::where('court_id', $booking->court_id)
                        ->where('date', $booking->booking_date)
                        ->where('start_time', $booking->start_time)
                        ->update(['is_booked' => 0]);
                }
            });

            return back()->with('success', 'Booking cancelled successfully. The court slot is now open for other players.');

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to cancel the booking. Please try again later.');
        }
    }
}

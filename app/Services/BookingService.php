<?php

namespace App\Services;

use App\Models\Court;
use App\Models\TimeSlot;
use App\Models\Booking;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Exception;
use User;

class BookingService
{
    /**
     * Generate or fetch slots for a court on a given date.
     */
    public function getAvailableSlotsForDate(Court $court, string $date): array
    {
        $dayOfWeek = Carbon::parse($date)->format('l');
        $schedule = $court->schedules()->where('day_of_week', $dayOfWeek)->first();

        if (!$schedule) {
            throw new Exception('The court is closed on this day.');
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

        return [
            'dayOfWeek' => $dayOfWeek,
            'slots' => $slots,
        ];
    }

    /**
     * Atomically handle booking creation, slot lock, and payment record.
     */
    public function createBooking($user, int $courtId, int $timeSlotId, string $paymentMethod): Booking
    {
        return DB::transaction(function () use ($user, $courtId, $timeSlotId, $paymentMethod) {
            // Lock the time slot row to prevent concurrent race conditions
            $timeSlot = TimeSlot::where('id', $timeSlotId)->lockForUpdate()->firstOrFail();

            if ($timeSlot->is_booked) {
                throw new Exception('This time slot has already been booked. Please select another slot.');
            }

            $court = Court::findOrFail($courtId);

            // Mark slot as booked
            $timeSlot->update(['is_booked' => true]);

            // Create Booking
            $booking = Booking::create([
                'customer_id' => $user->id,
                'court_id' => $court->id,
                'time_slot_id' => $timeSlot->id,
                'total_amount' => $court->hourly_rate,
                'status' => 'confirmed',
            ]);

            // Record Payment
            Payment::create([
                'user_id' => $user->id,
                'booking_id' => $booking->id,
                'payment_method' => $paymentMethod,
                'transaction_reference' => 'TXN-' . strtoupper(uniqid()),
                'amount' => $court->hourly_rate,
                'payment_status' => 'success',
                'paid_at' => now(),
            ]);

            return $booking;
        });
    }

    /**
     * Safely cancel a booking and release its corresponding resource slot.
     */
    public function cancelBooking(Booking $booking): void
    {
        DB::transaction(function () use ($booking) {
            $booking->update(['status' => 'cancelled']);

            if ($booking->time_slot_id) {
                TimeSlot::where('id', $booking->time_slot_id)->update(['is_booked' => 0]);
            } elseif (isset($booking->court_id, $booking->booking_date, $booking->start_time)) {
                // Fallback check
                \App\Models\CourtSchedule::where('court_id', $booking->court_id)
                    ->where('date', $booking->booking_date)
                    ->where('start_time', $booking->start_time)
                    ->update(['is_booked' => 0]);
            }
        });
    }
}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 3. Courts Table
        Schema::create('courts', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('surface_type', 100);
            $table->decimal('hourly_rate', 10, 2);
            $table->enum('status', ['available', 'maintenance', 'closed'])->default('available');
            $table->timestamps();
        });

        DB::statement('ALTER TABLE courts ADD CONSTRAINT courts_hourly_rate_check CHECK (hourly_rate >= 0)');

        // 4. Court Schedules Table
        Schema::create('court_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained('courts')->cascadeOnDelete();
            $table->enum('day_of_week', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
            $table->time('opening_time');
            $table->time('closing_time');
            $table->timestamps();

            $table->unique(['court_id', 'day_of_week']);
        });

        DB::statement('ALTER TABLE court_schedules ADD CONSTRAINT schedule_times_check CHECK (closing_time > opening_time)');

        // 5. Time Slots Table
        Schema::create('time_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained('courts')->cascadeOnDelete();
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->boolean('is_booked')->default(false);
            $table->timestamps();
        });

        DB::statement('ALTER TABLE time_slots ADD CONSTRAINT slot_times_check CHECK (end_time > start_time)');

        // 6. Bookings Table
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('court_id')->constrained('courts')->cascadeOnDelete();
            $table->foreignId('time_slot_id')->unique()->constrained('time_slots')->cascadeOnDelete();
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled'])->default('pending');
            $table->timestamps();
        });

        DB::statement('ALTER TABLE bookings ADD CONSTRAINT booking_amount_check CHECK (total_amount >= 0)');

        // 7. Payments Table
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('booking_id')->nullable()->constrained('bookings')->cascadeOnDelete();
            $table->unsignedBigInteger('subscription_id')->nullable(); // Optional subscription reference
            $table->enum('payment_method', ['gcash', 'credit_card', 'debit_card']);
            $table->string('transaction_reference')->unique();
            $table->decimal('amount', 10, 2);
            $table->enum('payment_status', ['pending', 'success', 'failed', 'refunded'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });

        DB::statement('ALTER TABLE payments ADD CONSTRAINT payment_amount_check CHECK (amount > 0)');
        
        // Security constraint: Exclusive Payment check
        DB::statement('
            ALTER TABLE payments ADD CONSTRAINT exclusive_payment_target_check 
            CHECK (
                (booking_id IS NOT NULL AND subscription_id IS NULL) OR 
                (booking_id IS NULL AND subscription_id IS NOT NULL)
            )
        ');
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('time_slots');
        Schema::dropIfExists('court_schedules');
        Schema::dropIfExists('courts');
    }
};
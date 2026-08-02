<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // 1. Drop the foreign key constraint first
            $table->dropForeign(['time_slot_id']);

            // 2. Drop the unique index
            $table->dropUnique('bookings_time_slot_id_unique');

            // 3. Re-add it as a standard foreign key (without unique constraint)
            $table->foreign('time_slot_id')->references('id')->on('time_slots')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['time_slot_id']);
            $table->unique('time_slot_id');
            $table->foreign('time_slot_id')->references('id')->on('time_slots')->cascadeOnDelete();
        });
    }
};
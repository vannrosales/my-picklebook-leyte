<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete(); 
            $table->enum('tier_name', [
                        'For Players', 
                        'Single Court', 
                        'Dual Courts', 
                        '3 Courts Tier', 
                        '4 Courts Tier', 
                        '5 Courts Tier', 
                        '6 Courts Tier', 
                        '7 Courts Tier', 
                        '8 Courts Tier'
                    ])->default('Single Court');
            $table->decimal('monthly_price', 10, 2);
            $table->enum('status', ['active', 'expired', 'cancelled', 'pending'])->default('pending');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();
        });

        
        DB::statement('ALTER TABLE subscriptions ADD CONSTRAINT subscription_price_check CHECK (monthly_price >= 0)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
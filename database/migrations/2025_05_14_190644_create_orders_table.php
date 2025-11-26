<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained();
            $table->foreignId('division_id')->constrained();
            $table->foreignId('district_id')->constrained();
            $table->foreignId('upazilla_id')->nullable();

            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();

            $table->text('address')->nullable();

            $table->string('post_code')->nullable();
            $table->text('notes')->nullable();

            $table->string('payment_type')->nullable();
            $table->string('payment_method')->nullable();

            $table->string('transaction_id')->nullable();

            $table->text('discount')->nullable();
            $table->float('amount');
            $table->string('currency')->default('BDT');

            $table->string('order_number')->nullable();
            $table->string('invoice_no');
            $table->date('order_date');

            $table->string('confirmed_date')->nullable();

            $table->string('processing_date')->nullable();
            $table->string('picked_date')->nullable();
            $table->string('shipped_date')->nullable();
            $table->string('delivered_date')->nullable();

            $table->string('cancel_date')->nullable();
            $table->string('out_of_delivery_date')->nullable();
            $table->string('return_date')->nullable();

            $table->string('return_reason')->nullable();

            $table->enum(
                'status',
                ['pending', 'processing', 'confirmed', 'out_for_delivery', 'shipped', 'returned', 'delivered', 'failed',
                    'canceled']
            )->default('pending');

            $table->enum('payment_status', ['paid', 'processing', 'due', 'unpaid'])
                ->default('unpaid');

            $table->string('order_type')->default('physical');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

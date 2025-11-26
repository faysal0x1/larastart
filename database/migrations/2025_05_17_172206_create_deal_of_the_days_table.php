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
        Schema::create('deal_of_the_days', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('image')->nullable();

            $table->enum('discount_type', ['fixed', 'percentage'])->default('fixed'); // Use 'enum', $allowed)
            $table->decimal('discount', 8, 2);

            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deal_of_the_days');
    }
};

<?php

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
        Schema::create('freelancers', function (Blueprint $table) {
            $table->id();
			$table->foreignId('user_id')->constrained()->onDelete('cascade');
			$table->string('title')->nullable();
			$table->text('description')->nullable();
			$table->decimal('hourly_rate', 8, 2)->nullable();
			$table->string('education')->nullable();
			$table->string('experience')->nullable();
			$table->string('availability')->default('full-time');
			$table->integer('completed_jobs')->default(0);
			$table->integer('ongoing_jobs')->default(0);
			$table->integer('cancelled_jobs')->default(0);
			$table->decimal('total_earnings', 10, 2)->default(0.00);
			$table->decimal('rating', 3, 2)->default(0.00);
			$table->integer('review_count')->default(0);
			$table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancers');
    }
};

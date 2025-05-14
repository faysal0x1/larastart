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
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
			$table->foreignId('user_id')->constrained()->onDelete('cascade');
			$table->string('company_name');
			$table->text('company_description')->nullable();
			$table->string('company_website')->nullable();
			$table->string('company_position')->nullable();
			$table->string('industry')->nullable();
			$table->string('company_size')->nullable();
			$table->string('company_logo')->nullable();
			$table->boolean('is_verified_employer')->default(false);
			$table->integer('posted_jobs')->default(0);
			$table->integer('completed_jobs')->default(0);
			$table->integer('ongoing_jobs')->default(0);
			$table->integer('cancelled_jobs')->default(0);
			$table->decimal('total_spent', 10, 2)->default(0.00);
			$table->decimal('rating', 3, 2)->default(0.00);
			$table->integer('review_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};

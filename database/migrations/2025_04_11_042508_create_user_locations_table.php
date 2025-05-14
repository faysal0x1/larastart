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
        Schema::create('user_locations', function (Blueprint $table) {
            $table->id();
			$table->foreignId('user_id')->constrained()->onDelete('cascade');
			$table->string('country', 100)->nullable()->index();
			$table->string('region', 100)->nullable()->index();
			$table->string('city', 100)->nullable()->index();
			$table->string('postal_code', 20)->nullable();
			$table->decimal('latitude', 10, 7)->nullable();
			$table->decimal('longitude', 10, 7)->nullable();
			$table->boolean('location_verified')->default(false);
			$table->timestamp('location_verified_at')->nullable();
			$table->string('timezone', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_locations');
    }
};

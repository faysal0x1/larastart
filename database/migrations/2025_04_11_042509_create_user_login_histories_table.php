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
        Schema::create('user_login_histories', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
			$table->string('ip_address', 45)->nullable();
			$table->text('user_agent')->nullable();
			$table->json('location')->nullable();
			$table->string('session_id')->nullable();
			$table->enum('event_type', [
				'login_attempt',
				'login_success',
				'login_failed',
				'logout',
				'session_expired',
				'forced_previous_logout',
				'suspicious_activity'
			]);
			$table->boolean('is_suspicious')->default(false)->index();
			$table->text('error_message')->nullable();
			$table->json('additional_data')->nullable();
			$table->timestamps();

			$table->index(['user_id', 'event_type']);
			$table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_login_histories');
    }
};

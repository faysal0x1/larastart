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
        Schema::create('user_securities', function (Blueprint $table) {
            $table->id();
			$table->foreignId('freelancer_id')->constrained()->onDelete('cascade');
			$table->boolean('two_factor_enabled')->default(false);
			$table->string('two_factor_method')->nullable();
			$table->boolean('login_notifications')->default(true);
			$table->boolean('suspicious_activity_alerts')->default(true);
			$table->json('trusted_devices')->nullable();
			$table->json('authorized_ips')->nullable();
			$table->integer('failed_login_attempts')->default(0);
			$table->timestamp('last_password_change')->nullable();
			$table->boolean('account_locked')->default(false);
			$table->timestamp('lock_expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_securities');
    }
};

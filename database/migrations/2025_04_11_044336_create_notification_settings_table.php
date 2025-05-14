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
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
			$table->foreignId('user_id')->constrained()->onDelete('cascade');
			$table->boolean('email_job_applications')->default(true);
			$table->boolean('email_job_offers')->default(true);
			$table->boolean('email_messages')->default(true);
			$table->boolean('email_payment_updates')->default(true);
			$table->boolean('email_task_updates')->default(true);
			$table->boolean('email_reviews')->default(true);
			$table->boolean('email_promotions')->default(true);
			$table->boolean('email_newsletters')->default(true);
			$table->boolean('push_job_applications')->default(true);
			$table->boolean('push_job_offers')->default(true);
			$table->boolean('push_messages')->default(true);
			$table->boolean('push_payment_updates')->default(true);
			$table->boolean('push_task_updates')->default(true);
			$table->boolean('push_reviews')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_settings');
    }
};

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
        Schema::create('user_verifications', function (Blueprint $table) {
            $table->id();
			$table->foreignId('user_id')->constrained()->onDelete('cascade');
			$table->string('document_type')->nullable(); // ID, Passport, etc.
			$table->string('document_number')->nullable();
			$table->string('front_document_photo')->nullable();
			$table->string('back_document_photo')->nullable();
			$table->string('selfie_with_document')->nullable();
			$table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
			$table->text('rejection_reason')->nullable();
			$table->timestamp('verified_at')->nullable();
			$table->foreignId('verified_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_verifications');
    }
};

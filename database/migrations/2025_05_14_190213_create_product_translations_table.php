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
        Schema::create('product_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('locale', 10); // en, bn, ar, etc.
            $table->string('name');
            $table->string('slug');
            $table->text('short_descp')->nullable();
            $table->text('long_descp')->nullable();
            $table->string('tags')->nullable();
            $table->string('size')->nullable();
            $table->timestamps();

            // Ensure unique combination of product_id and locale
            $table->unique(['product_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_translations');
    }
};

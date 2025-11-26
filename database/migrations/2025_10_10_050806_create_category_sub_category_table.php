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
        Schema::create('category_sub_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('categories')
                ->nullable();
            $table->foreignId('sub_category_id')->constrained('categories')
                ->nullable();
            $table->integer('priority')->nullable();
            $table->timestamps();

            // Ensure unique combination of category and sub_category
            $table->unique(['category_id', 'sub_category_id'], 'cat_sub_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_sub_category');
    }
};
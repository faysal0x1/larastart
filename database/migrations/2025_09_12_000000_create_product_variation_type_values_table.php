<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_variation_type_values', function (Blueprint $table) {
            $table->id();
            $table->string('value');
            $table->foreignId('variation_type_id')->constrained('product_variation_types')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['variation_type_id', 'value'], 'uniq_type_value');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variation_type_values');
    }
};
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('spec_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spec_group_id')->constrained('spec_groups')->onDelete('cascade');
            $table->string('name');
            $table->string('input_type')->default('text');
            $table->timestamps();
            $table->unique(['spec_group_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('spec_attributes');
    }
};

<?php

declare(strict_types=1);

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
        Schema::create('upazillas', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('ship_district_id');
            // $table->unsignedBigInteger('district_id');

            $table->string('upazilla_name');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('upazillas');
    }
};

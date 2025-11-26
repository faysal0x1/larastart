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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->integer('priority')->nullable();
            $table->text('description')->nullable();
            $table->integer('level')->default(0);
            $table->string('path')->nullable();

            //            $table->string('parent_id')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();

            $table->foreign('parent_id')->references('id')
                ->on('categories')
                ->onDelete('cascade');
            $table->string('position')->nullable();
            $table->string('is_menu_active')->nullable();
            $table->string('menu_position')->nullable();
            $table->string('image')->nullable();
            $table->string('banner')->nullable();
            $table->string('bottom_description')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_image')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('is_featured')->nullable();
            $table->string('is_active')->nullable();


            $table->boolean('status')->nullable();

            $table->timestamps();
            $table->softDeletes();
            $table->index(['parent_id', 'level']);
            $table->index('path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};

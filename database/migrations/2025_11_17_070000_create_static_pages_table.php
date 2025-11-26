<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('static_pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->longText('content')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        DB::table('static_pages')->insert([
            [
                'title'      => 'Return Policy',
                'slug'       => 'return-policy',
                'summary'    => 'Details about product returns and exchanges.',
                'content'    => '<p>Update this content with your official return policy.</p>',
                'is_active'  => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'      => 'Privacy & Security',
                'slug'       => 'privacy-policy',
                'summary'    => 'How we manage customer data and security.',
                'content'    => '<p>Update this content with your official privacy statement.</p>',
                'is_active'  => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'      => 'Terms & Conditions',
                'slug'       => 'terms-and-conditions',
                'summary'    => 'Usage terms for the TBZ platform.',
                'content'    => '<p>Update this content with your official terms.</p>',
                'is_active'  => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('static_pages');
    }
};

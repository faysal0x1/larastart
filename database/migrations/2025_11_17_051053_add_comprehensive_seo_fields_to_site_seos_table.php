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
        Schema::table('site_seos', function (Blueprint $table) {
            // Basic Meta Tags (keeping existing, adding missing)
            $table->string('meta_robots')->nullable()->after('meta_description');
            $table->string('canonical_url')->nullable()->after('meta_robots');

            // Open Graph Tags
            $table->string('og_title')->nullable()->after('canonical_url');
            $table->text('og_description')->nullable()->after('og_title');
            $table->string('og_type')->nullable()->default('website')->after('og_description');
            $table->string('og_url')->nullable()->after('og_type');
            $table->string('og_image')->nullable()->after('og_url');
            $table->string('og_image_alt')->nullable()->after('og_image');
            $table->string('og_site_name')->nullable()->after('og_image_alt');
            $table->string('og_locale')->nullable()->default('en_US')->after('og_site_name');

            // Twitter Card Tags
            $table->string('twitter_card')->nullable()->default('summary_large_image')->after('og_locale');
            $table->string('twitter_title')->nullable()->after('twitter_card');
            $table->text('twitter_description')->nullable()->after('twitter_title');
            $table->string('twitter_image')->nullable()->after('twitter_description');
            $table->string('twitter_site')->nullable()->after('twitter_image');
            $table->string('twitter_creator')->nullable()->after('twitter_site');

            // Favicon and Icons
            $table->string('favicon')->nullable()->after('twitter_creator');
            $table->string('apple_touch_icon')->nullable()->after('favicon');
            $table->string('manifest_icon')->nullable()->after('apple_touch_icon');

            // Additional Meta
            $table->string('theme_color')->nullable()->after('manifest_icon');
            $table->string('author')->nullable()->after('theme_color');
            $table->string('copyright')->nullable()->after('author');
            $table->string('language')->nullable()->default('en')->after('copyright');

            // Structured Data / Schema.org
            $table->text('schema_markup')->nullable()->after('language');

            // Tracking Scripts
            $table->text('fb_pixel_id')->nullable()->after('schema_markup');
            $table->text('additional_tracking_scripts')->nullable()->after('fb_pixel_id');
        });

        // Migrate data from fb_piexel_id to fb_pixel_id if exists
        if (Schema::hasColumn('site_seos', 'fb_piexel_id')) {
            \DB::statement('UPDATE site_seos SET fb_pixel_id = fb_piexel_id WHERE fb_pixel_id IS NULL AND fb_piexel_id IS NOT NULL');
            // Optionally drop the old column after migration
            // Schema::table('site_seos', function (Blueprint $table) {
            //     $table->dropColumn('fb_piexel_id');
            // });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_seos', function (Blueprint $table) {
            $table->dropColumn([
                'meta_robots',
                'canonical_url',
                'og_title',
                'og_description',
                'og_type',
                'og_url',
                'og_image',
                'og_image_alt',
                'og_site_name',
                'og_locale',
                'twitter_card',
                'twitter_title',
                'twitter_description',
                'twitter_image',
                'twitter_site',
                'twitter_creator',
                'favicon',
                'apple_touch_icon',
                'manifest_icon',
                'theme_color',
                'author',
                'copyright',
                'language',
                'schema_markup',
                'fb_pixel_id',
                'additional_tracking_scripts',
            ]);
        });
    }
};

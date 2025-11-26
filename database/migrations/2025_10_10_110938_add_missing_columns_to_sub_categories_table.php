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
        Schema::table('sub_categories', function (Blueprint $table) {
            if (! Schema::hasColumn('sub_categories', 'description')) {
                $table->text('description')->nullable()->after('priority');
            }
            if (! Schema::hasColumn('sub_categories', 'image')) {
                $table->string('image')->nullable()->after('description');
            }
            if (! Schema::hasColumn('sub_categories', 'banner')) {
                $table->string('banner')->nullable()->after('image');
            }
            if (! Schema::hasColumn('sub_categories', 'meta_title')) {
                $table->string('meta_title')->nullable()->after('banner');
            }
            if (! Schema::hasColumn('sub_categories', 'meta_image')) {
                $table->string('meta_image')->nullable()->after('meta_title');
            }
            if (! Schema::hasColumn('sub_categories', 'meta_description')) {
                $table->string('meta_description')->nullable()->after('meta_image');
            }
            if (! Schema::hasColumn('sub_categories', 'is_featured')) {
                $table->boolean('is_featured')->default(false)->after('meta_description');
            }
            if (! Schema::hasColumn('sub_categories', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('is_featured');
            }
            if (! Schema::hasColumn('sub_categories', 'priority')) {
                $table->integer('priority')->nullable()->after('slug');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sub_categories', function (Blueprint $table) {
            if (Schema::hasColumn('sub_categories', 'description')) {
                $table->dropColumn('description');
            }
            if (Schema::hasColumn('sub_categories', 'image')) {
                $table->dropColumn('image');
            }
            if (Schema::hasColumn('sub_categories', 'banner')) {
                $table->dropColumn('banner');
            }
            if (Schema::hasColumn('sub_categories', 'meta_title')) {
                $table->dropColumn('meta_title');
            }
            if (Schema::hasColumn('sub_categories', 'meta_image')) {
                $table->dropColumn('meta_image');
            }
            if (Schema::hasColumn('sub_categories', 'meta_description')) {
                $table->dropColumn('meta_description');
            }
            if (Schema::hasColumn('sub_categories', 'is_featured')) {
                $table->dropColumn('is_featured');
            }
            if (Schema::hasColumn('sub_categories', 'is_active')) {
                $table->dropColumn('is_active');
            }
            // Do not drop priority if it existed before this migration
        });
    }
};
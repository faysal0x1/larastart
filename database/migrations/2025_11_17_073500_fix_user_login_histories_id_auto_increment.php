<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE user_login_histories MODIFY COLUMN id BIGINT UNSIGNED NOT NULL');

        $hasPrimaryKey = DB::table('information_schema.TABLE_CONSTRAINTS')
            ->where('TABLE_SCHEMA', DB::raw('DATABASE()'))
            ->where('TABLE_NAME', 'user_login_histories')
            ->where('CONSTRAINT_TYPE', 'PRIMARY KEY')
            ->exists();

        if (! $hasPrimaryKey) {
            DB::statement('ALTER TABLE user_login_histories ADD PRIMARY KEY (id)');
        }

        DB::statement('ALTER TABLE user_login_histories MODIFY COLUMN id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE user_login_histories MODIFY COLUMN id BIGINT UNSIGNED NOT NULL');
    }
};
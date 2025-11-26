<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThemesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('themes')->insert([
            [
                'name' => 'Default Theme',
                'slug' => 'default',
                'description' => 'Default e-commerce theme',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dark Theme',
                'slug' => 'dark',
                'description' => 'Dark mode e-commerce theme',
                'is_active' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Minimalist Theme',
                'slug' => 'minimalist',
                'description' => 'Clean and minimal e-commerce theme',
                'is_active' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

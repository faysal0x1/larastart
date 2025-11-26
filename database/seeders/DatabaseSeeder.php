<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void {
        // user::factory(10)->create();

        $this->call([
            // Theme Seeder
            ThemesSeeder::class,
            MarketingServicesSeeder::class,
            // User Related Seeder
            UserSeeder::class,
            CountrySeeder::class,
            TagSeeder::class,

            ColorAttributeSeeder::class,

            // Permissions Part
            PermissionSeeder::class,
            RoleSeeder::class,
            AssignPermissionsAndRolesSeeder::class,
            // BrandSeeder::class,
            // CategorySeeder::class,
            DivisionSeeder::class,
            DistrictSeeder::class,
            UpazillaSeeder::class,
        ]);
    }
}

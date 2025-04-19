<?php

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
			UserSeeder::class,
			TagSeeder::class,
			PostSeeder::class,
			PostTagSeeder::class,
			CountrySeeder::class,

		]);
	}
}

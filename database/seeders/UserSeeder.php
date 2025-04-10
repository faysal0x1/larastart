<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		User::create([
			'name' => 'Demo User',
			'email' => 'admin@gmail.com',
			'email_verified_at' => now(),
			'password' => Hash::make('password'),
			'remember_token' => Str::random(10),
		]);
		if (User::count() === 0) {
			User::factory(10)->create();
		}


	}
}

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
		$data = [
			[
				'name' => 'Admin',
				'username' => 'admin',
				'email' => 'admin@gmail.com',
				'email_verified_at' => now(),
				'password' => Hash::make('password'),
				'remember_token' => Str::random(10),
				'role' => 'admin',
			],
			[
				'name' => 'Super Admin',
				'username' => 'superadmin',
				'email' => 'superadmin@gmail.com',
				'email_verified_at' => now(),
				'password' => Hash::make('password'),
				'remember_token' => Str::random(10),
				'role' => 'superadmin',
			],
			[
				'name' => 'Super Moderator',
				'username' => 'supermoderator',
				'email' => 'supermoderator@gmail.com',
				'email_verified_at' => now(),
				'password' => Hash::make('password'),
				'remember_token' => Str::random(10),
				'role' => 'supermoderator',
			],
			[
				'name' => 'Employer',
				'username' => 'employer',
				'email' => 'employer@gmail.com',
				'email_verified_at' => now(),
				'password' => Hash::make('password'),
				'remember_token' => Str::random(10),
				'role' => 'employer',
			],
			[
				'name' => 'freelancer',
				'username' => 'freelancer',
				'email' => 'freelancer@gmail.com',
				'email_verified_at' => now(),
				'password' => Hash::make('password'),
				'remember_token' => Str::random(10),
				'role' => 'freelancer',
			]
		];


		User::insert($data);


		User::factory(10)->create();


	}
}

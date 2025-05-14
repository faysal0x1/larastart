<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
	public function run() {
		// Reset cached roles and permissions
		app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

		// Define permissions grouped by resource
		$resources = [
			'dashboard' => [
				'view-dashboard',
			],
			'roles' => [
				'view-roles',
				'create-roles',
				'edit-roles',
				'delete-roles',
			],
			'permissions' => [
				'view-permissions',
				'create-permissions',
				'edit-permissions',
				'delete-permissions',
			],
			'users' => [
				'view-users',
				'create-users',
				'edit-users',
				'status-users',
				'delete-users',
			],
			'posts' => [
				'view-posts',
				'create-posts',
				'edit-posts',
				'delete-posts',
			],
			'freelancers' => [
				'view-freelancers',
				'create-freelancers',
				'edit-freelancers',
				'delete-freelancers',
			],
			'employers' => [
				'view-employers',
				'create-employers',
				'edit-employers',
				'delete-employers',
			],
			'micro-task-categories' => [
				'view-micro-task-categories',
				'create-micro-task-categories',
				'edit-micro-task-categories',
				'delete-micro-task-categories',
			],
			'profile' => [
				'view-profile',
				'update-profile',
				'delete-profile',
			],
			'password' => [
				'update-password',
			],
			'appearance' => [
				'view-appearance',
			],
			'settings' => [
				'manage-settings',
			],
			'admin' => [
				'update-status',
			],
		];

		// Create permissions
		foreach ($resources as $resource => $permissions) {
			foreach ($permissions as $permission) {
				Permission::firstOrCreate(['name' => $permission]);
			}
		}

		// You might want to add some output to know the seeder worked
		$this->command->info('Permissions seeded successfully!');
	}
}
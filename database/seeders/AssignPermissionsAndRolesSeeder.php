<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AssignPermissionsAndRolesSeeder extends Seeder
{
	public function run() {
		// Reset cached roles and permissions
		app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

		// Assign permissions to roles
		$superAdmin = Role::findByName('super-admin');
		$superAdmin->givePermissionTo(Permission::all());

		$admin = Role::findByName('admin');
		$admin->givePermissionTo([
			// User permissions
			'view-users',
			'create-users',
			'edit-users',
			'delete-users',

			// Role permissions
			'view-roles',
			'create-roles',
			'edit-roles',

			// Permission permissions (view only)
			'view-permissions',

			// Dashboard & settings
			'view-dashboard',
			'manage-settings',
		]);

		$editor = Role::findByName('editor');
		$editor->givePermissionTo([
			'view-dashboard',
		]);

		$userRole = Role::findByName('user');
		$userRole->givePermissionTo([
			'view-dashboard',
		]);

		// Assign roles to users
		// Assign super-admin to first user (typically the system owner)
		if ($firstUser = User::first()) {
			$firstUser->assignRole('super-admin');
		}

		// Optional: Create and assign admin user if needed
		$adminUser = User::findOrFail(1);
		$adminUser->assignRole('admin');
	}
}
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
	public function run() {
		// Reset cached roles and permissions
		app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

		// Create permissions
		$permissions = [
			// User permissions
			'view_users',
			'create_users',
			'edit_users',
			'delete_users',
			// Role permissions
			'view_roles',
			'create_roles',
			'edit_roles',
			'delete_roles',
			// Other permissions
			'view_dashboard',
			'manage_settings',
		];

		foreach ($permissions as $permission) {
			Permission::create(['name' => $permission]);
		}

		// Create roles and assign permissions
		$role = Role::create(['name' => 'super-admin']);
		$role->givePermissionTo(Permission::all());

		$role = Role::create(['name' => 'admin']);
		$role->givePermissionTo([
			'view-users',
			'create-users',
			'edit-users',
			'view-roles',
			'view-dashboard',
			'manage-settings',
		]);

		$role = Role::create(['name' => 'editor']);
		$role->givePermissionTo([
			'view-dashboard',
		]);

		$role = Role::create(['name' => 'user']);
		$role->givePermissionTo([
			'view-dashboard',
		]);

		if ($admin = User::find(1)) {
			$admin->assignRole('super-admin');
		}
	}
}
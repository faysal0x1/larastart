<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
	public function index(Request $request) {
//		$query = Role::with('permissions')->query();
		$query = Role::query();
		$query = $query->with('permissions');


		$params = $request->isMethod('post') ? $request->all() : $request->query();

		$combinedRequest = new Request($params);

		$query = QueryBuilderHelper::apply($combinedRequest, $query, ['name', 'created_at'], ['name', 'created_at',]);
		$data = QueryBuilderHelper::paginate($combinedRequest, $query);

		return Inertia::render('admin/roles/index', [
			'data' => $data
		]);
	}

	public function create() {
		$permissions = Permission::all();

		return Inertia::render('admin/roles/create', [
			'permissions' => $permissions
		]);
	}

	public function store(Request $request) {
		try {
			$request->validate([
				'name' => 'required|string|max:255|unique:roles',
				'permissions' => 'required|array',
			]);

			$role = Role::create(['name' => $request->name]);
			$role->syncPermissions($request->permissions);

			return success_route('roles.index', 'Role created successfully.');

		} catch (Exception $e) {
			return error_route('roles.index', 'Failed to create role: ' . $e->getMessage());
		}
	}

	public function edit(Role $role) {
		$permissions = Permission::all();
		$rolePermissions = $role->permissions->pluck('id')->toArray();

		return Inertia::render('admin/roles/edit', [
			'role' => $role,
			'permissions' => $permissions,
			'rolePermissions' => $rolePermissions
		]);
	}

	public function update(Request $request, Role $role) {
		$request->validate([
			'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
			'permissions' => 'required|array',
		]);

		$role->update(['name' => $request->name]);
		$role->syncPermissions($request->permissions);

		return redirect()->route('roles.index')
			->with('success', 'Role updated successfully.');
	}

	public function destroy(Role $role) {
		if ($role->name === 'super-admin') {
			return back()->with('error', 'Cannot delete super-admin role.');
		}

		$role->delete();

		return redirect()->route('roles.index')
			->with('success', 'Role deleted successfully.');
	}
}
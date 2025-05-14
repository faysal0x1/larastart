<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserRoleAssignmentController extends Controller
{
	public function index(Request $request) {
		$query = User::with('roles')->whereHas('roles');

		$params = $request->isMethod('post') ? $request->all() : $request->query();
		$combinedRequest = new Request($params);

		$query = QueryBuilderHelper::apply($combinedRequest, $query,
			['name', 'email', 'created_at'],
			['name', 'email', 'created_at']
		);

		$data = QueryBuilderHelper::paginate($combinedRequest, $query);

		return Inertia::render('admin/user-role-assignments/index', [
			'data' => $data,
			'roles' => Role::all()->pluck('name', 'id')
		]);
	}

	public function create() {
		return Inertia::render('admin/user-role-assignments/create', [
			'users' => User::all(),
			'roles' => Role::all()
		]);
	}

	public function store(Request $request) {
		try {
			$request->validate([
				'user_id' => 'required|exists:users,id',
				'role_ids' => 'required|array',
				'role_ids.*' => 'exists:roles,id'
			]);

			$user = User::findOrFail($request->user_id);
			$roles = Role::whereIn('id', $request->role_ids)->get();

			$user->syncRoles($roles);

			return success_route('user-role-assignments.index', 'Roles assigned successfully.');
		} catch (\Exception $e) {
			return error_route('user-role-assignments.index', 'Failed to assign roles: ' . $e->getMessage());
		}
	}

	public function edit($id) {
		$user = User::findOrFail($id);
		return Inertia::render('admin/user-role-assignments/edit', [
			'user' => $user->load('roles'),
			'roles' => Role::all(),
			'userRoles' => $user->roles->pluck('id')->toArray(),
			'userRoleNames' => $user->roles->pluck('name')->toArray()
		]);
	}

	public function update(Request $request, $id) {
		$user = User::findOrFail($id);
		try {
			$request->validate([
				'role_names' => 'required|array',
				'role_names.*' => 'exists:roles,name'
			]);

			$user->syncRoles($request->role_names);

			return success_route("user-role-assignments.index", "Role assignments updated successfully.");

		} catch (\Exception $e) {
			return error_response("Failed to update role assignments: " . $e->getMessage());
		}
	}

	public function destroy($id) {
		try {
			$user = User::findOrFail($id);
			$user->roles()->detach();
			return success_response("Role removed successfully.");

		} catch (\Exception $e) {
			return error_response("Failed to remove role: " . $e->getMessage());
		}

	}
}
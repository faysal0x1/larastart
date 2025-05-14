<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
	public function index(Request $request) {
		$query = Permission::query();


		$params = $request->isMethod('post') ? $request->all() : $request->query();

		$combinedRequest = new Request($params);

		$query = QueryBuilderHelper::apply($combinedRequest, $query, ['name', 'created_at'], ['name', 'created_at',]);
		$data = QueryBuilderHelper::paginate($combinedRequest, $query);

		return Inertia::render('admin/permissions/index', ['data' => $data]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		return Inertia::render('admin/permissions/create');
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request) {
		try {
			Permission::create($request->all());

			return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
		} catch (Exception $e) {
			return redirect()->back()->with('error', $e->getMessage());
		}
	}

	/**
	 * Display the specified resource.
	 */
	public function show(string $id) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(string $id) {
		$permission = Permission::find($id);

		return Inertia::render('admin/permissions/edit', [
			'permission' => $permission
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, string $id) {
		try {
			DB::beginTransaction();
			$data = Permission::findOrFail($id);

			$data->update($request->all());

			DB::commit();

			return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
		} catch (Exception $e) {
			return redirect()->back()->with('error', $e->getMessage());
		}
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(string $id) {
		try {
			DB::beginTransaction();
			$data = Permission::findOrFail($id);

			$data->delete();

			DB::commit();

			return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully.');
		} catch (Exception $e) {
			return redirect()->back()->with('error', $e->getMessage());
		}
	}
}

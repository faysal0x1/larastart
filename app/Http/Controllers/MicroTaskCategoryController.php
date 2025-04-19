<?php

namespace App\Http\Controllers;

use App\Helpers\QueryBuilderHelper;
use App\Http\Requests\StoreMicroTaskCategory;
use App\Models\MicroTaskCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class MicroTaskCategoryController extends Controller
{
	public function index(Request $request): Response {
		// Combine request methods to handle both GET and POST
		$data = MicroTaskCategory::query();

		$params = $request->isMethod('post') ? $request->all() : $request->query();

		$combinedRequest = new Request($params);

		$query = QueryBuilderHelper::apply($combinedRequest, $data, ['name', 'description', 'created_at',], ['name', 'description', 'created_at']);
		$users = QueryBuilderHelper::paginate($combinedRequest, $query);

		return Inertia::render('micro-job-category/index', [
			'data' => $users,
			'filters' => QueryBuilderHelper::filters($combinedRequest),
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		return Inertia::render('micro-job-category/create');
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreMicroTaskCategory $request)
	{
		try {
			DB::beginTransaction();

			MicroTaskCategory::create($request->validated());
			DB::commit();

			return redirect()->route('micro-task-categories.index')->with('success', [
				'title' => 'Success!',
				'message' => 'Category created successfully.',
			]);


		} catch (\Exception $e) {
			DB::rollBack();
			return back()->withInput()->with('error', [
				'title' => 'Error!',
				'message' => 'Failed to create category: ' . $e->getMessage(),
			]);
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
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, string $id) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(string $id) {
		//
	}
}

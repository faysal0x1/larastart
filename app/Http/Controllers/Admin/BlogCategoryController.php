<?php
// app/Http/Controllers/Admin/BlogCategoryController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\BlogCategoryStoreRequest;
use App\Http\Requests\BlogCategoryUpdateRequest;
use App\Repositories\Interfaces\BlogCategoryRepositoryInterface;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogCategoryController extends Controller
{
	public function __construct(
		private readonly BlogCategoryRepositoryInterface $blogcategoryRepository
	) {
	}

	/**
	 * Display a listing of blogcategorys.
	 */
	public function index(Request $request): Response {
		$blogCategories = $this->blogcategoryRepository->paginate($request);

		return Inertia::render('blogcategory/index', [
			'blogCategory' => $blogCategories,
			'filters' => QueryBuilderHelper::filters($request),
		]);
	}

	/**
	 * Show the form for creating a new blogcategory.
	 */
	public function create(): Response {
		return Inertia::render('blogcategory/create');
	}

	/**
	 * Store a newly created blogcategory in storage.
	 */
	public function store(BlogCategoryStoreRequest $request): RedirectResponse {
		try {
			$this->blogcategoryRepository->create($request->validated());

			return success_route('blog-category.index', 'BlogCategory created successfully.');
		} catch (Exception $e) {
			return error_route('blogcategory.index', 'Failed to create blogcategory: ' . $e->getMessage());
		}
	}

	/**
	 * Display the specified blogcategory.
	 */
	public function show(int $id): Response {
		$blogcategory = $this->blogcategoryRepository->find($id);

		if (!$blogcategory) {
			error_response('BlogCategory not found', 404);
		}

		return Inertia::render('blogcategory/show', [
			'blogcategory' => $blogcategory,
		]);
	}

	/**
	 * Show the form for editing the specified blogcategory.
	 */
	public function edit(int $id): Response {
		$blogcategory = $this->blogcategoryRepository->find($id);

		if (!$blogcategory) {
			error_response('BlogCategory not found', 404);
		}
		return Inertia::render('blogcategory/edit', [
			'blogcategory' => $blogcategory,
		]);
	}

	/**
	 * Update the specified blogcategory in storage.
	 */
	public function update(BlogCategoryUpdateRequest $request, int $id): RedirectResponse {
		try {
			$this->blogcategoryRepository->update($request->validated(), $id);
			return success_route('blog-category.index', 'BlogCategory updated successfully.');

		} catch (Exception $e) {
			return error_route('blog-category.index', 'Failed to update blogcategory: ' . $e->getMessage());
		}
	}

	/**
	 * Remove the specified blogcategory from storage.
	 */
	public function destroy(int $id): RedirectResponse {
		try {
			$this->blogcategoryRepository->delete($id);


			return success_response('BlogCategory deleted successfully.');
		} catch (Exception $e) {
			return error_response("Failed to delete blogcategory: " . $e->getMessage());
		}
	}
}
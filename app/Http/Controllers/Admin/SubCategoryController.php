<?php

// app/Http/Controllers/Admin/SubCategoryController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Repositories\SubCategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubCategoryController extends Controller
{
    public function __construct(
        private readonly SubCategoryRepository $subcategoryRepository
    ) {}

    /**
     * Display a listing of subcategorys.
     */
    public function index(Request $request): Response
    {
        $subcategorys = $this->subcategoryRepository->paginate($request);

        return Inertia::render('subcategory/index', [
            'subcategorys' => $subcategorys,
            'filters'      => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new subcategory.
     */
    public function create(): Response
    {
        $categories = Category::whereNull('parent_id')->get();

        return Inertia::render('subcategory/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created subcategory in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $this->subcategoryRepository->create($request->all());

            return success_route('sub-category.index', 'SubCategory created successfully.');
        } catch (\Exception $e) {
            return error_route('sub-category.index', 'Failed to create subcategory: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified subcategory.
     */
    public function show(int $id): Response
    {
        $subcategory = $this->subcategoryRepository->withRelation(['parent', 'children', 'products'], $id);

        if (! $subcategory) {
            error_response('SubCategory not found', 404);
        }

        return Inertia::render('subcategory/show', [
            'subcategory' => $subcategory,
        ]);
    }

    /**
     * Show the form for editing the specified subcategory.
     */
    public function edit(int $id): Response
    {
        $subcategory = $this->subcategoryRepository->withRelation(['parent'], $id);
        $categories  = Category::whereNull('parent_id')->get();

        if (! $subcategory) {
            error_response('SubCategory not found', 404);
        }

        return Inertia::render('subcategory/edit', [
            'subcategory' => $subcategory,
            'categories'  => $categories,
        ]);
    }

    /**
     * Update the specified subcategory in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        try {
            $this->subcategoryRepository->update($request->all(), $id);

            return success_route('sub-category.index', 'SubCategory updated successfully.');

        } catch (\Exception $e) {
            return error_route('sub-category.index', 'Failed to update subcategory: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified subcategory from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->subcategoryRepository->delete($id);

            return success_route('sub-category.index', 'SubCategory deleted successfully.');
        } catch (\Exception $e) {
            return error_route('sub-category.index', 'Failed to delete subcategory: ' . $e->getMessage());
        }
    }

    /**
     * Remove multiple subcategories from storage.
     */
    public function batchDelete(Request $request): RedirectResponse
    {
        try {
            $ids = $request->input('ids', []);

            // Validate input
            if (empty($ids) || ! is_array($ids)) {
                return error_route('sub-category.index', 'No subcategories selected for deletion.');
            }

            // Validate that all IDs are integers
            $validIds = array_filter($ids, function ($id) {
                return is_numeric($id) && (int) $id > 0;
            });

            if (empty($validIds)) {
                return error_route('sub-category.index', 'Invalid subcategory IDs provided.');
            }

            // Delete subcategories using repository
            $deletedCount = $this->subcategoryRepository->batchDelete($validIds);

            if ($deletedCount > 0) {
                return success_route('sub-category.index', "{$deletedCount} subcategories deleted successfully.");
            } else {
                return error_route('sub-category.index', 'No subcategories were deleted.');
            }

        } catch (\Exception $e) {
            return error_route('sub-category.index', 'Failed to delete subcategories: ' . $e->getMessage());
        }
    }
}

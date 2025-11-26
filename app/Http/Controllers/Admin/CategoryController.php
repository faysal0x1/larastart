<?php

// app/Http/Controllers/Admin/CategoryController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository
    ) {
    }

    /**
     * Display a listing of categorys.
     */
    public function index(Request $request): Response
    {
        $categorys = $this->categoryRepository->paginate($request);

        return Inertia::render('category/index', [
            'categorys' => $categorys,
            'filters'   => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        // Get all root categories for parent selection
        $parentCategories = $this->categoryRepository->getRootCategories();

        return Inertia::render('category/create', [
            'parentCategories' => $parentCategories,
        ]);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(CategoryStoreRequest $request): RedirectResponse
    {
        try {
            $validatedData = $request->validated();

            $category = $this->categoryRepository->createWithHierarchy($validatedData);

            return success_route('category.index', 'Category created successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to create category:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data'  => $request->all(),
            ]);

            return error_route('category.index', 'Failed to create category: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category): Response
    {
        // Load relationships for the category
        $category->load(['parent', 'children', 'products']);

        if (! $category) {
            error_response('Category not found', 404);
        }

        return Inertia::render('category/show', [
            'category' => $category,
        ]);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category): Response
    {
        if (! $category) {
            error_response('Category not found', 404);
        }

        // Get all root categories for parent selection (excluding current category and its descendants)
        $parentCategories = $this->categoryRepository->getAvailableParents($category->id);

        return Inertia::render('category/edit', [
            'category'         => $category,
            'parentCategories' => $parentCategories,
        ]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, Category $category): RedirectResponse
    {
        try {
            $this->categoryRepository->updateWithHierarchy($request->all(), $category->id);

            return success_route('category.index', 'Category updated successfully.');

        } catch (\Exception $e) {
            return error_route('category.index', 'Failed to update category: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        try {
            $this->categoryRepository->delete($category->id);

            return success_route('category.index', 'Category deleted successfully.');
        } catch (\Exception $e) {
            return error_route('category.index', 'Failed to delete category: ' . $e->getMessage());
        }
    }

    /**
     * Remove multiple categories from storage.
     */
    public function batchDelete(Request $request): RedirectResponse
    {
        try {
            $ids = $request->input('ids', []);

            // Validate input
            if (empty($ids) || ! is_array($ids)) {
                return error_route('category.index', 'No categories selected for deletion.');
            }

            // Validate that all IDs are integers
            $validIds = array_filter($ids, function ($id) {
                return is_numeric($id) && (int) $id > 0;
            });

            if (empty($validIds)) {
                return error_route('category.index', 'Invalid category IDs provided.');
            }

            // Delete categories using repository
            $deletedCount = $this->categoryRepository->batchDelete($validIds);

            if ($deletedCount > 0) {
                return success_route('category.index', "{$deletedCount} categories deleted successfully.");
            } else {
                return error_route('category.index', 'No categories were deleted.');
            }

        } catch (\Exception $e) {
            return error_route('category.index', 'Failed to delete categories: ' . $e->getMessage());
        }
    }

    /**
     * Get subcategories for a given parent category.
     */
    public function getSubCategories(int $parentId)
    {
        $subCategories = $this->categoryRepository->getChildren($parentId);

        return response()->json($subCategories);
    }

    /**
     * Get child categories for a given subcategory.
     */
    public function getChildCategories(int $parentId)
    {
        $childCategories = $this->categoryRepository->getChildren($parentId);

        return response()->json($childCategories);
    }

    /**
     * Get category hierarchy for display.
     */
    public function getHierarchy()
    {
        $hierarchy = $this->categoryRepository->getHierarchy();

        return response()->json($hierarchy);
    }
}
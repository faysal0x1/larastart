<?php

// app/Http/Controllers/Admin/ProductVariationController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductVariationStoreRequest;
use App\Http\Requests\ProductVariationUpdateRequest;
use App\Models\Product;
use App\Repositories\ProductVariationRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductVariationController extends Controller
{
    public function __construct(
        private readonly ProductVariationRepository $productvariationRepository
    ) {
    }

    /**
     * Display a listing of productvariations.
     */
    public function index(Request $request): Response {
        $productVariations = $this->productvariationRepository->paginate($request);

        return Inertia::render('productvariation/index', [
            'productvariations' => $productVariations,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new product-variation.
     */
    public function create(): Response {
        $products = Product::all();
        return Inertia::render('productvariation/create', [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created productvariation in storage.
     */
    public function store(ProductVariationStoreRequest $request): RedirectResponse {
        try {
            $this->productvariationRepository->create($request->validated());

            return success_route('product-variation.index', 'ProductVariation created successfully.');
        } catch (\Exception $e) {
            return error_route('product-variation.index', 'Failed to create productvariation: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified product-variation.
     */
    public function show(int $id): Response {
        $productvariation = $this->productvariationRepository->find($id);

        if (!$productvariation) {
            error_response('ProductVariation not found', 404);
        }

        return Inertia::render('productvariation/show', [
            'productvariation' => $productvariation,
        ]);
    }

    /**
     * Show the form for editing the specified product-variation.
     */
    public function edit(int $id): Response {
        $productvariation = $this->productvariationRepository->find($id);

        if (!$productvariation) {
            error_response('ProductVariation not found', 404);
        }

        return Inertia::render('productvariation/edit', [
            'productvariation' => $productvariation,
        ]);
    }

    /**
     * Update the specified productvariation in storage.
     */
    public function update(ProductVariationUpdateRequest $request, int $id): RedirectResponse {
        try {
            $this->productvariationRepository->update($request->validated(), $id);

            return success_route('product-variation.index', 'ProductVariation updated successfully.');

        } catch (\Exception $e) {
            return error_route('product-variation.index', 'Failed to update productvariation: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified productvariation from storage.
     */
    public function destroy(int $id): RedirectResponse {
        try {
            $this->productvariationRepository->delete($id);

            return success_route('product-variation.index', 'ProductVariation deleted successfully.');
        } catch (\Exception $e) {
            return error_route('product-variation.index', 'Failed to delete productvariation: ' . $e->getMessage());
        }
    }
}

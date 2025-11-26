<?php

// app/Http/Controllers/Admin/ProductCartController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCartStoreRequest;
use App\Http\Requests\ProductCartUpdateRequest;
use App\Repositories\ProductCartRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductCartController extends Controller
{
    public function __construct(
        private readonly ProductCartRepository $productcartRepository
    ) {}

    /**
     * Display a listing of productcarts.
     */
    public function index(Request $request): Response
    {
        $productcarts = $this->productcartRepository->paginate($request);

        return Inertia::render('productcart/index', [
            'productcarts' => $productcarts,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new productcart.
     */
    public function create(): Response
    {
        return Inertia::render('productcart/create');
    }

    /**
     * Store a newly created productcart in storage.
     */
    public function store(ProductCartStoreRequest $request): RedirectResponse
    {
        try {
            $this->productcartRepository->create($request->validated());

            return success_route('productcart.index', 'ProductCart created successfully.');
        } catch (\Exception $e) {
            return error_route('productcart.index', 'Failed to create productcart: '.$e->getMessage());
        }
    }

    /**
     * Display the specified productcart.
     */
    public function show(int $id): Response
    {
        $productcart = $this->productcartRepository->find($id);

        if (! $productcart) {
            error_response('ProductCart not found', 404);
        }

        return Inertia::render('productcart/show', [
            'productcart' => $productcart,
        ]);
    }

    /**
     * Show the form for editing the specified productcart.
     */
    public function edit(int $id): Response
    {
        $productcart = $this->productcartRepository->find($id);

        if (! $productcart) {
            error_response('ProductCart not found', 404);
        }

        return Inertia::render('productcart/edit', [
            'productcart' => $productcart,
        ]);
    }

    /**
     * Update the specified productcart in storage.
     */
    public function update(ProductCartUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->productcartRepository->update($request->validated(), $id);

            return success_route('productcart.index', 'ProductCart updated successfully.');

        } catch (\Exception $e) {
            return error_route('productcart.index', 'Failed to update productcart: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified productcart from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->productcartRepository->delete($id);

            return success_route('productcart.index', 'ProductCart deleted successfully.');
        } catch (\Exception $e) {
            return error_route('productcart.index', 'Failed to delete productcart: '.$e->getMessage());
        }
    }
}

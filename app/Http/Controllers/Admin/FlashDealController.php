<?php

// app/Http/Controllers/Admin/FlashDealController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\FlashDealStoreRequest;
use App\Http\Requests\FlashDealUpdateRequest;
use App\Models\Product;
use App\Repositories\FlashDealRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FlashDealController extends Controller
{
    public function __construct(
        private readonly FlashDealRepository $flashdealRepository
    ) {}

    /**
     * Display a listing of flashdeals.
     */
    public function index(Request $request): Response
    {
        $flashdeals = $this->flashdealRepository->paginate($request);

        return Inertia::render('flashdeal/index', [
            'flashdeals' => $flashdeals,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new flashdeal.
     */
    public function create(): Response
    {
        return Inertia::render('flashdeal/create');
    }

    /**
     * Store a newly created flashdeal in storage.
     */
    public function store(FlashDealStoreRequest $request): RedirectResponse
    {
        try {
            $this->flashdealRepository->create($request->validated());

            return success_route('flash-deal.index', 'FlashDeal created successfully.');
        } catch (\Exception $e) {
            return error_route('flash-deal.index', 'Failed to create flashdeal: '.$e->getMessage());
        }
    }

    /**
     * Display the specified flashdeal.
     */
    public function show(int $id): Response
    {
        $flashdeal = $this->flashdealRepository->find($id);

        if (! $flashdeal) {
            error_response('FlashDeal not found', 404);
        }

        return Inertia::render('flashdeal/show', [
            'flashdeal' => $flashdeal,
        ]);
    }

    /**
     * Show the form for editing the specified flashdeal.
     */
    public function edit(int $id): Response
    {
        $flashdeal = $this->flashdealRepository->find($id);

        if (! $flashdeal) {
            error_response('FlashDeal not found', 404);
        }

        return Inertia::render('flashdeal/edit', [
            'flashdeal' => $flashdeal,
        ]);
    }

    /**
     * Update the specified flashdeal in storage.
     */
    public function update(FlashDealUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->flashdealRepository->update($request->validated(), $id);

            return success_route('flash-deal.index', 'FlashDeal updated successfully.');

        } catch (\Exception $e) {
            return error_route('flash-deal.index', 'Failed to update flashdeal: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified flashdeal from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->flashdealRepository->delete($id);

            return success_route('flash-deal.index', 'FlashDeal deleted successfully.');
        } catch (\Exception $e) {
            return error_route('flash-deal.index', 'Failed to delete flashdeal: '.$e->getMessage());
        }
    }

    public function getProductsForFlashDeal($id)
    {
        try {
            // Load the flashdeal with its related flash deal products
            $flashdeal = $this->flashdealRepository->withRelation(['flashDealProducts.product'], $id);

            if (! $flashdeal) {
                return error_route('flash-deal.index', 'FlashDeal not found');
            }

            // Get all active products
            $products = Product::where('status', 1)
                ->select('id', 'name', 'final_price', 'product_thumbnail')
                ->get();

            return Inertia::render('flashdeal/add-products', [
                'flashdeal' => $flashdeal,
                'products' => $products,
            ]);
        } catch (\Exception $e) {
            return error_route('flash-deal.index', 'Failed to get flashdeal: '.$e->getMessage());
        }
    }

    public function addProductToFlashDeal(Request $request, $id)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'product_ids' => 'required|array',
                'product_ids.*' => 'exists:products,id',
            ]);

            // Process the product IDs
            $this->flashdealRepository->addProductToFlashDeal($validated, $id);

            return success_route('flash-deal.index', 'Products added to flash deal successfully.');
        } catch (\Exception $e) {
            return error_route('flash-deal.index', 'Failed to add products to flash deal: '.$e->getMessage());
        }
    }
}

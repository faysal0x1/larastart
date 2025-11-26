<?php
namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\DealOfTheDayStoreRequest;
use App\Http\Requests\DealOfTheDayUpdateRequest;
use App\Models\Product;
use App\Repositories\DealOfTheDayRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DealOfTheDayController extends Controller
{
    public function __construct(
        private readonly DealOfTheDayRepository $dealofthedayRepository
    ) {
    }

    /**
     * Display a listing of dealofthedays.
     */
    public function index(Request $request): Response
    {
        $dealofthedays = $this->dealofthedayRepository->paginate($request);

        return Inertia::render('dealoftheday/index', [
            'dealofthedays' => $dealofthedays,
            'filters'       => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new dealoftheday.
     */
    public function create(): Response
    {
        $products = Product::all();
        return Inertia::render('dealoftheday/create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created dealoftheday in storage.
     */
    public function store(DealOfTheDayStoreRequest $request): RedirectResponse
    {
        try {
            $this->dealofthedayRepository->create($request->validated());

            return success_route('deal-of-the-day.index', 'DealOfTheDay created successfully.');
        } catch (\Exception $e) {
            return error_route('deal-of-the-day.index', 'Failed to create dealoftheday: ' . $e->getMessage());
        }
    }

    public function addProduct(int $id)
    {
        $dealoftheday = $this->dealofthedayRepository->find($id);
        if (! $dealoftheday) {
            error_response('DealOfTheDay not found', 404);
        }

        $products = Product::with(['brand', 'category', 'subCategory',
            'tag', 'media', 'multiImages', 'wishlists', 'productReviews',
            'colorImages', 'seo', 'variations'])->get();

        // Get already added products for this deal
        $addedProducts = $dealoftheday->dealOfTheDayProduct()->with(['product.brand', 'product.category', 'product.subCategory', 'product.tag', 'product.media'])->get();

        return Inertia::render('dealoftheday/add-product', [
            'dealoftheday'  => $dealoftheday,
            'products'      => $products,
            'addedProducts' => $addedProducts,
        ]);
    }

    public function storeProducts(Request $request, int $id)
    {
        $dealoftheday = $this->dealofthedayRepository->find($id);
        if (! $dealoftheday) {
            return error_response('DealOfTheDay not found', 404);
        }

        $request->validate([
            'product_ids'      => 'required|array|min:1',
            'product_ids.*'    => 'exists:products,id',
            'quantities'       => 'array',
            'quantities.*'     => 'integer|min:1',
            'prices'           => 'array',
            'prices.*'         => 'numeric|min:0',
            'discount_types'   => 'array',
            'discount_types.*' => 'in:percentage,fixed',
            'discounts'        => 'array',
            'discounts.*'      => 'numeric|min:0',
        ]);

        try {
            // Remove existing products for this deal
            $dealoftheday->dealOfTheDayProduct()->delete();

            // Add new products
            foreach ($request->product_ids as $index => $productId) {
                $dealoftheday->dealOfTheDayProduct()->create([
                    'product_id'    => $productId,
                    'quantity'      => $request->quantities[$index] ?? 1,
                    'price'         => $request->prices[$index] ?? 0,
                    'discount_type' => $request->discount_types[$index] ?? 'percentage',
                    'discount'      => $request->discounts[$index] ?? 0,
                ]);
            }

            return success_route('deal-of-the-day.index', 'Products added to deal successfully.');
        } catch (\Exception $e) {
            return error_route('deal-of-the-day.add-product', $dealoftheday->id, 'Failed to add products: ' . $e->getMessage());
        }
    }

    public function updateProduct(Request $request, int $dealId, int $productId)
    {
        $dealoftheday = $this->dealofthedayRepository->find($dealId);
        if (! $dealoftheday) {
            return error_response('DealOfTheDay not found', 404);
        }

        $request->validate([
            'quantity'      => 'required|integer|min:1',
            'price'         => 'required|numeric|min:0',
            'discount_type' => 'required|in:percentage,fixed',
            'discount'      => 'required|numeric|min:0',
        ]);

        try {
            $dealProduct = $dealoftheday->dealOfTheDayProduct()->where('product_id', $productId)->first();

            if (! $dealProduct) {
                return error_response('Product not found in this deal', 404);
            }

            $dealProduct->update([
                'quantity'      => $request->quantity,
                'price'         => $request->price,
                'discount_type' => $request->discount_type,
                'discount'      => $request->discount,
            ]);

            return success_route('deal-of-the-day.add-product',  'Product updated successfully.');
        } catch (\Exception $e) {
            return error_route('deal-of-the-day.add-product', 'Failed to update product: ' . $e->getMessage());
        }
    }

    public function removeProduct(int $dealId, int $productId)
    {
        $dealoftheday = $this->dealofthedayRepository->find($dealId);
        if (! $dealoftheday) {
            return error_response('DealOfTheDay not found', 404);
        }

        try {
            $dealProduct = $dealoftheday->dealOfTheDayProduct()->where('product_id', $productId)->first();

            if (! $dealProduct) {
                return error_response('Product not found in this deal', 404);
            }

            $dealProduct->delete();

            return success_route('deal-of-the-day.add-product', $dealoftheday->id, 'Product removed successfully.');
        } catch (\Exception $e) {
            return error_route('deal-of-the-day.add-product', $dealoftheday->id, 'Failed to remove product: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified dealoftheday.
     */
    public function show(int $id): Response
    {
        $dealoftheday = $this->dealofthedayRepository->find($id);

        if (! $dealoftheday) {
            error_response('DealOfTheDay not found', 404);
        }

        return Inertia::render('dealoftheday/show', [
            'dealoftheday' => $dealoftheday,
        ]);
    }

    /**
     * Show the form for editing the specified dealoftheday.
     */
    public function edit(int $id): Response
    {
        $dealoftheday = $this->dealofthedayRepository->find($id);

        if (! $dealoftheday) {
            error_response('DealOfTheDay not found', 404);
        }

        return Inertia::render('dealoftheday/edit', [
            'dealoftheday' => $dealoftheday,
        ]);
    }

    /**
     * Update the specified dealoftheday in storage.
     */
    public function update(DealOfTheDayUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->dealofthedayRepository->update($request->validated(), $id);

            return success_route('deal-of-the-day.index', 'DealOfTheDay updated successfully.');

        } catch (\Exception $e) {
            return error_route('deal-of-the-day.index', 'Failed to update dealoftheday: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified dealoftheday from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->dealofthedayRepository->delete($id);

            return success_route('deal-of-the-day.index', 'DealOfTheDay deleted successfully.');
        } catch (\Exception $e) {
            return error_route('deal-of-the-day.index', 'Failed to delete dealoftheday: ' . $e->getMessage());
        }
    }
}

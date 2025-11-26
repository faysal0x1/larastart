<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\DealOfTheDay;
use App\Models\Product;
use App\Modules\Cache\Services\SmartCacheService;
use App\Modules\Cart\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WebController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function getProducts()
    {
        $products = Product::with(['brand', 'category', 'subCategory',
            'tag', 'media', 'multiImages', 'wishlists', 'productReviews',
            'colorImages', ' seo', 'variations',
        ])->paginate(2);

        return response()->json($products);
    }

    /**
     * Minimal paginated products for Home grid (12 per page by default)
     */
    public function paginatedProducts(Request $request)
    {
        $perPage = (int) ($request->input('per_page', 12));
        $perPage = max(1, min($perPage, 48));
        $page    = (int) ($request->input('page', 1));

        $paginator = Product::query()
            ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at'])
            ->orderByDesc('created_at')
            ->paginate($perPage, ['*'], 'page', $page);

        // Transform items to include cache-busted image URL
        $items = collect($paginator->items())
            ->map(function ($p) {
                $imagePath = $p->image_url ?: null;
                $updatedAt = $p->updated_at ? (is_string($p->updated_at) ? $p->updated_at : $p->updated_at->toDateTimeString()) : null;
                $imageUrl  = $imagePath
                    ? (\App\Http\Controllers\FrontendController::getCacheBustedImageUrl($imagePath, $updatedAt))
                    : '/placeholder.svg';

                return [
                    'id'             => $p->id,
                    'name'           => $p->name,
                    'slug'           => $p->slug,
                    'unit_price'     => (float) ($p->unit_price ?? 0),
                    'final_price'    => (float) ($p->final_price ?? 0),
                    'discount_type'  => $p->discount_type,
                    'discount_price' => $p->discount_price ? (float) $p->discount_price : null,
                    'image_url'      => $imageUrl,
                    'updated_at'     => $updatedAt,
                ];
            })
            ->values();

        return response()->json([
            'data' => $items,
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
                'last_page'    => $paginator->lastPage(),
            ],
        ]);
    }

    /**
     * Lightweight Best Deals for Home (DealOfTheDay with minimal product fields)
     */
    public function bestDeals(Request $request)
    {
        $limitDeals = (int) ($request->input('limit', 10));
        $limitDeals = max(1, min($limitDeals, 30));

        $deals = DealOfTheDay::query()
            ->select(['id', 'discount', 'created_at'])
            ->with([
                'dealOfTheDayProduct:id,deal_of_the_day_id,product_id',
                'dealOfTheDayProduct.product' => function ($q) {
                    $q->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at']);
                },
            ])
            ->latest('created_at')
            ->limit($limitDeals)
            ->get()
            ->map(function ($deal) {
                return [
                    'id'       => $deal->id,
                    'discount' => $deal->discount,
                    'products' => $deal->dealOfTheDayProduct->map(function ($dp) {
                        $p = $dp->product;
                        if (! $p) {
                            return null;
                        }

                        $updatedAt = $p->updated_at ? $p->updated_at->toDateTimeString() : null;
                        $imageUrl  = $p->image_url
                            ? (\App\Http\Controllers\FrontendController::getCacheBustedImageUrl($p->image_url, $updatedAt))
                            : '/placeholder.svg';

                        return [
                            'id'      => $dp->id,
                            'product' => [
                                'id'             => $p->id,
                                'name'           => $p->name,
                                'slug'           => $p->slug,
                                'unit_price'     => (float) ($p->unit_price ?? 0),
                                'final_price'    => (float) ($p->final_price ?? 0),
                                'discount_type'  => $p->discount_type,
                                'discount_price' => $p->discount_price ? (float) $p->discount_price : null,
                                'image_url'      => $imageUrl,
                                'updated_at'     => $updatedAt,
                            ],
                        ];
                    })->filter()->values(),
                ];
            })
            ->values();

        return response()->json(['data' => $deals]);
    }

    /**
     * Minimal products for Productivity Showcase section (client-side fetch)
     */
    public function productivityProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 12));
        $limit = max(1, min($limit, 48));

        $products = Product::query()
            ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'brand_id', 'tags'])
            ->with(['brand:id,name'])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get()
            ->map(function ($p) {
                $updatedAt = $p->updated_at ? $p->updated_at->toDateTimeString() : null;
                $imageUrl  = $p->image_url
                    ? (\App\Http\Controllers\FrontendController::getCacheBustedImageUrl($p->image_url, $updatedAt))
                    : '/placeholder.svg';

                return [
                    'id'             => $p->id,
                    'name'           => $p->name,
                    'slug'           => $p->slug,
                    'unit_price'     => (float) ($p->unit_price ?? 0),
                    'final_price'    => (float) ($p->final_price ?? 0),
                    'discount_type'  => $p->discount_type,
                    'discount_price' => $p->discount_price ? (float) $p->discount_price : null,
                    'image_url'      => $imageUrl,
                    'updated_at'     => $updatedAt,
                    'brand'          => ['name' => $p->brand?->name],
                    'tags'           => $p->tags,
                ];
            })
            ->values();

        return response()->json(['data' => $products]);
    }

    /**
     * Lightweight products for NewSelected slider (minimal fields, fast)
     */
    public function newSelectedProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 24));
        $limit = max(1, min($limit, 60));

        $products = Product::query()
            ->select([
                'id',
                'name',
                'slug',
                'unit_price',
                'final_price',
                'discount_type',
                'discount_price',
                'product_thumbnail',
                'updated_at',
            ])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get()
            ->map(function ($p) {
                // Build a lightweight payload with cache-busted thumbnail
                $imagePath = $p->image_url ?: null;
                $updatedAt = $p->updated_at ? $p->updated_at->toDateTimeString() : null;
                $imageUrl  = $imagePath
                    ? (\App\Http\Controllers\FrontendController::getCacheBustedImageUrl($imagePath, $updatedAt))
                    : '/placeholder.svg';

                return [
                    'id'             => $p->id,
                    'name'           => $p->name,
                    'slug'           => $p->slug,
                    'unit_price'     => (float) ($p->unit_price ?? 0),
                    'final_price'    => (float) ($p->final_price ?? 0),
                    'discount_type'  => $p->discount_type,
                    'discount_price' => $p->discount_price ? (float) $p->discount_price : null,
                    'image_url'      => $imageUrl,
                    'updated_at'     => $updatedAt,
                ];
            })
            ->values();

        return response()->json([
            'data'  => $products,
            'count' => $products->count(),
        ]);
    }

    /**
     * Lightweight products for NewAtTbz slider (newest arrivals)
     */
    public function newAtTbzProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 24));
        $limit = max(1, min($limit, 60));

        $products = Product::query()
            ->select([
                'id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'created_at',
            ])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get()
            ->map(function ($p) {
                $imagePath = $p->image_url ?: null;
                $updatedAt = $p->updated_at ? $p->updated_at->toDateTimeString() : null;
                $imageUrl  = $imagePath
                    ? (\App\Http\Controllers\FrontendController::getCacheBustedImageUrl($imagePath, $updatedAt))
                    : '/placeholder.svg';

                return [
                    'id'             => $p->id,
                    'name'           => $p->name,
                    'slug'           => $p->slug,
                    'unit_price'     => (float) ($p->unit_price ?? 0),
                    'final_price'    => (float) ($p->final_price ?? 0),
                    'discount_type'  => $p->discount_type,
                    'discount_price' => $p->discount_price ? (float) $p->discount_price : null,
                    'image_url'      => $imageUrl,
                    'updated_at'     => $updatedAt,
                    'created_at'     => $p->created_at?->toDateTimeString(),
                ];
            })
            ->values();

        return response()->json([
            'data'  => $products,
            'count' => $products->count(),
        ]);
    }

    /**
     * Lightweight products for TbzSelected slider (featured/special_offer)
     */
    public function tbzSelectedProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 24));
        $limit = max(1, min($limit, 60));

        $products = Product::query()
            ->select([
                'id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'special_offer', 'featured',
            ])
            ->where(function ($q) {
                $q->where('special_offer', 1)->orWhere('featured', 1);
            })
            ->orderByDesc('updated_at')
            ->limit($limit)
            ->get()
            ->map(function ($p) {
                $imagePath = $p->image_url ?: null;
                $updatedAt = $p->updated_at ? $p->updated_at->toDateTimeString() : null;
                $imageUrl  = $imagePath
                    ? (\App\Http\Controllers\FrontendController::getCacheBustedImageUrl($imagePath, $updatedAt))
                    : '/placeholder.svg';

                return [
                    'id'             => $p->id,
                    'name'           => $p->name,
                    'slug'           => $p->slug,
                    'unit_price'     => (float) ($p->unit_price ?? 0),
                    'final_price'    => (float) ($p->final_price ?? 0),
                    'discount_type'  => $p->discount_type,
                    'discount_price' => $p->discount_price ? (float) $p->discount_price : null,
                    'image_url'      => $imageUrl,
                    'updated_at'     => $updatedAt,
                ];
            })
            ->values();

        return response()->json([
            'data'  => $products,
            'count' => $products->count(),
        ]);
    }

    public function dealOfTheDay()
    {
        $product = DealOfTheDay::with(['dealOfTheDayProduct', 'dealOfTheDayProduct.product'])->get();
    }

    public function addToCart(Request $request)
    {
        // Validate the request
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'integer|min:1|max:999',
            'color'      => 'nullable|string|max:255',
            'size'       => 'nullable|string|max:255',
            'variation'  => 'nullable|string|max:255',
        ]);

        try {
            // Prepare options for the cart item
            $options = $request->only(['color', 'size', 'variation']);

            // Get session ID and user ID for cart management
            $sessionId = $request->cookies->get('cart_session');
            $userId    = Auth::id();

            // Use CartService to add item to cart
            $result = $this->cartService->addToCart(
                $request->product_id,
                $request->input('quantity', 1),
                $options,
                $sessionId,
                $userId
            );

            // Return appropriate response
            if ($result['success']) {
                return response()->json([
                    'status'       => 'success',
                    'message'      => $result['message'],
                    'cart'         => $result['cart'],
                    'cart_summary' => [
                        'total_items'  => $result['cart']['total_items'],
                        'total_amount' => $result['cart']['total_amount'],
                        'currency'     => $result['cart']['currency'],
                    ],
                ]);
            } else {
                return response()->json([
                    'status'  => 'error',
                    'message' => $result['message'],
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'An error occurred while adding item to cart: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getBrands(Request $request)
    {
        $perPage = (int) ($request->input('per_page', 20));
        $perPage = max(1, min($perPage, 60));
        $page    = (int) ($request->input('page', 1));

        // Cache key per page to avoid heavy repeated queries
        $cacheKey = "brands_page_{$page}_per_{$perPage}";
        $cached   = SmartCacheService::remember('brands', $cacheKey, function () use ($perPage, $page) {
            $paginator = Brand::query()
                ->with('media')
                ->orderBy('name')
                ->paginate($perPage, ['*'], 'page', $page);

            $items = collect($paginator->items())->map(function ($b) {
                $image = null;
                if (isset($b->media) && count($b->media) > 0) {
                    $image = $b->media[0]->original_url ?? null;
                }
                return [
                    'id'    => $b->id,
                    'name'  => $b->name,
                    'image' => $image,
                    'slug'  => $b->slug ?? null,
                ];
            })->values();

            return [
                'data' => $items,
                'meta' => [
                    'current_page' => $paginator->currentPage(),
                    'per_page'     => $paginator->perPage(),
                    'total'        => $paginator->total(),
                    'last_page'    => $paginator->lastPage(),
                ],
            ];
        });

        return response()->json($cached);
    }

    public function paymentDemo(Request $request)
    {
        $sessionId = $request->cookies->get('cart_session');
        $userId    = Auth::id();

        $cart = $this->cartService->getOrCreateCart($sessionId, $userId);

//    $cart->load('items.product');
        return Inertia::render('payment/Demo', [
            'cart' => $cart,
        ]);
    }

    public function getBrandProduct()
    {
        $data = Brand::with('products')->all();
        return response()->json($data);
    }

    public function getCategoryProduct()
    {
        return response()->json(
            [
                'data' => Category::with('products')->get(),
            ]
        );
    }

}

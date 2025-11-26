<?php

namespace App\Http\Controllers\Web;

use App\DTO\ProductCardData;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\DealOfTheDay;
use App\Models\Product;
use App\Modules\Cache\Services\SmartCacheService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class WebApiController extends Controller
{
    public function paginatedProducts(Request $request)
    {
        $perPage = (int) ($request->input('per_page', 12));
        $perPage = max(1, min($perPage, 48));
        $page    = (int) ($request->input('page', 1));

        $paginator = Product::query()
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
                'call_for_price',
            ])
            ->inRandomOrder()
            ->paginate($perPage, ['*'], 'page', $page);

        $items = ProductCardData::collection($paginator->items());

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

    public function bestDeals(Request $request)
    {
        $limitDeals = (int) ($request->input('limit', 10));
        $limitDeals = max(1, min($limitDeals, 30));

        $deals = DealOfTheDay::query()
            ->select(['id', 'discount', 'created_at'])
            ->with([
                'dealOfTheDayProduct:id,deal_of_the_day_id,product_id',
                'dealOfTheDayProduct.product' => function ($q) {
                    $q->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'call_for_price']);
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

                        return [
                            'id'      => $dp->id,
                            'product' => ProductCardData::fromProduct($p)->toArray(),
                        ];
                    })->filter()->values(),
                ];
            })
            ->values();

        return response()->json(['data' => $deals]);
    }

    public function productivityProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 12));
        $limit = max(1, min($limit, 48));

        $products = Product::query()
            ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'brand_id', 'tags', 'call_for_price'])
            ->with(['brand:id,name'])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();

        $productData = ProductCardData::collection($products, function (Product $p) {
            return [
                'brand' => $p->brand ? [
                    'id'   => $p->brand->id,
                    'name' => $p->brand->name,
                ] : null,
                'tags' => $p->tags,
            ];
        });

        return response()->json(['data' => $productData]);
    }

    public function newSelectedProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 24));
        $limit = max(1, min($limit, 60));

        $products = Product::query()
            ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'call_for_price'])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();

        $productData = ProductCardData::collection($products);

        return response()->json([
            'data'  => $productData,
            'count' => $productData->count(),
        ]);
    }

    public function newAtTbzProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 24));
        $limit = max(1, min($limit, 60));

        $products = Product::query()
            ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'created_at', 'call_for_price'])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();

        $productData = ProductCardData::collection($products, function (Product $p) {
            return [
                'created_at' => $p->created_at?->toDateTimeString(),
            ];
        });

        return response()->json([
            'data'  => $productData,
            'count' => $productData->count(),
        ]);
    }

    public function laptopSectionProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 24));
        $limit = max(1, min($limit, 60));

        $products = Product::query()
            ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'special_offer', 'featured', 'call_for_price'])
            ->where(function ($q) {$q->where('special_offer', 1)->orWhere('featured', 1);})
            ->orderByDesc('updated_at')
            ->limit($limit)
            ->get();

        $productData = ProductCardData::collection($products, function (Product $p) {
            return [
                'special_offer' => $p->special_offer,
                'featured'      => $p->featured,
            ];
        });

        return response()->json([
            'data'  => $productData,
            'count' => $productData->count(),
        ]);
    }
    public function tbzSelectedProducts(Request $request)
    {
        $limit = (int) ($request->input('limit', 24));
        $limit = max(1, min($limit, 60));

        $products = Product::query()
            ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'special_offer', 'featured', 'call_for_price'])
            ->where(function ($q) {$q->where('special_offer', 1)->orWhere('featured', 1);})
            ->orderByDesc('updated_at')
            ->limit($limit)
            ->get();

        $productData = ProductCardData::collection($products, function (Product $p) {
            return [
                'special_offer' => $p->special_offer,
                'featured'      => $p->featured,
            ];
        });

        return response()->json([
            'data'  => $productData,
            'count' => $productData->count(),
        ]);
    }

    public function getBrands(Request $request)
    {
        $perPage = (int) ($request->input('per_page', 20));
        $perPage = max(1, min($perPage, 60));
        $page    = (int) ($request->input('page', 1));

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

    /**
     * Clear all caches via HTTP request
     * For Inertia requests, authentication is handled by middleware
     */
    public function clearFullCache(Request $request)
    {
        try {
            // Clear SmartCacheService caches
            SmartCacheService::flushAll();

            // Clear Laravel application cache
            Cache::flush();

            // Clear config, route, and view caches
            Artisan::call('config:clear');
            Artisan::call('route:clear');
            Artisan::call('view:clear');

            // For Inertia requests, return a redirect with success message
            if ($request->header('X-Inertia')) {
                return redirect()->back()->with('success', 'All caches cleared successfully!');
            }

            // For API requests, return JSON
            return response()->json([
                'success' => true,
                'message' => 'All caches cleared successfully!',
                'cleared' => [
                    'smart_cache' => true,
                    'laravel_cache' => true,
                    'config_cache' => true,
                    'route_cache' => true,
                    'view_cache' => true,
                ],
            ], 200);
        } catch (\Exception $e) {
            Log::error('Cache clear error: ' . $e->getMessage());

            // For Inertia requests, return a redirect with error message
            if ($request->header('X-Inertia')) {
                return redirect()->back()->with('error', 'Error clearing caches: ' . $e->getMessage());
            }

            // For API requests, return JSON
            return response()->json([
                'success' => false,
                'message' => 'Error clearing caches: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getCategoriesWithHierarchy(Request $request)
    {
        $cacheKey = "categories_hierarchy_with_products";
        $cached   = SmartCacheService::remember('categories', $cacheKey, function () {
            // Load root categories with nested children relationships
            // Use whereNull for parent_id to get root categories only
            // Load all relationships without status filtering first to ensure we get all categories
            $rootCategories = Category::whereNull('parent_id')
                ->with(['children' => function ($query) {
                    $query->with(['children' => function ($subQuery) {
                        // Load all child categories
                    }])
                        ->orderBy('priority', 'asc');
                }])
                ->orderBy('priority', 'asc')
                ->get();

            return $rootCategories->map(function ($category) {
                // Ensure children are loaded and mapped correctly
                $subcategories = $category->children ?? collect();

                return [
                    'id'            => $category->id,
                    'name'          => $category->name,
                    'slug'          => $category->slug,
                    'image_url'     => $category->image_url,
                    'level'         => $category->level ?? 0,
                    'subcategories' => $subcategories->map(function ($subcategory) {
                        // Ensure child_categories are loaded
                        $childCategories = $subcategory->children ?? collect();

                        return [
                            'id'               => $subcategory->id,
                            'name'             => $subcategory->name,
                            'slug'             => $subcategory->slug,
                            'image_url'         => $subcategory->image_url ?? null,
                            'level'            => $subcategory->level ?? 1,
                            'child_categories' => $childCategories->map(function ($childCategory) {
                                return [
                                    'id'        => $childCategory->id,
                                    'name'      => $childCategory->name,
                                    'slug'      => $childCategory->slug,
                                    'image_url' => $childCategory->image_url ?? null,
                                    'level'     => $childCategory->level ?? 2,
                                ];
                            })->values()->toArray(), // Ensure it's always an array
                        ];
                    })->values()->toArray(), // Ensure it's always an array
                ];
            })->values()->toArray();
        });

        return response()->json(['data' => $cached]);
    }

    public function getCategoryProducts(Request $request, $categoryId)
    {
        $limit = (int) ($request->input('limit', 3));
        $limit = max(1, min($limit, 10));

        $cacheKey = "category_{$categoryId}_products_limit_{$limit}";
        $cached   = SmartCacheService::remember('products', $cacheKey, function () use ($categoryId, $limit) {
            $products = Product::query()
                ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'call_for_price'])
                ->where('category_id', $categoryId)
                ->where('status', 1)
                ->orderByDesc('created_at')
                ->limit($limit)
                ->get();

            return ProductCardData::collection($products);
        });

        return response()->json(['data' => $cached]);
    }

    public function searchProducts(Request $request)
    {
        $query = $request->input('q', '');
        $limit = (int) ($request->input('limit', 10));
        $limit = max(1, min($limit, 20));

        if (empty(trim($query))) {
            return response()->json(['data' => []]);
        }

        $products = Product::query()
            ->select(['id', 'name', 'slug', 'unit_price', 'final_price', 'discount_type', 'discount_price', 'product_thumbnail', 'updated_at', 'call_for_price'])
            ->where('status', 1)
            ->where(function ($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%")
                    ->orWhere('slug', 'LIKE', "%{$query}%")
                    ->orWhere('tags', 'LIKE', "%{$query}%");
            })
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();

        $productData = ProductCardData::collection($products);

        return response()->json(['data' => $productData]);
    }

    /**
     * Get cache version for service worker cache invalidation
     */
    public function getCacheVersion(Request $request)
    {
        $type = $request->input('type'); // Optional: specific cache type

        if ($type) {
            $version = SmartCacheService::getTypeCacheVersion($type);
        } else {
            $version = SmartCacheService::getCacheVersion();
        }

        return response()->json([
            'version'   => $version,
            'type'      => $type ?? 'global',
            'timestamp' => now()->toIso8601String(),
        ]);
    }

    /**
     * Get products by IDs (for recommendations)
     */
    public function getProductsByIds(Request $request)
    {
        $ids = $request->input('ids');

        if (! $ids) {
            return response()->json([]);
        }

        // Parse comma-separated IDs
        $productIds = is_array($ids) ? $ids : explode(',', $ids);
        $productIds = array_filter(array_map('intval', $productIds));

        if (empty($productIds)) {
            return response()->json([]);
        }

        $products = Product::with([
            'brand:id,name,slug',
            'productReviews:id,product_id',
            'category:id,name,slug',
        ])
            ->whereIn('id', $productIds)
            ->where('status', 1)
            ->get();

        $productMap = collect($products)->mapWithKeys(function (Product $product) {
            $multiImages = $product->getMedia('multi_images')->map(function ($media) {
                return [
                    'id'    => $media->id,
                    'photo' => $media->getUrl(),
                    'url'   => $media->getUrl(),
                ];
            })->values();

            $extra = [
                'hot_deals'       => $product->hot_deals,
                'featured'        => $product->featured,
                'brand'           => $product->brand ? [
                    'id'        => $product->brand->id,
                    'name'      => $product->brand->name,
                    'slug'      => $product->brand->slug,
                    'image_url' => $product->brand->image_url,
                ] : null,
                'category'        => $product->category ? [
                    'id'   => $product->category->id,
                    'name' => $product->category->name,
                    'slug' => $product->category->slug,
                ] : null,
                'product_reviews' => $product->productReviews?->values(),
                'multi_images'    => $multiImages,
            ];

            $data = ProductCardData::fromProduct($product, $extra)->toArray();

            return [$product->id => $data];
        });

        $orderedProducts = collect($productIds)
            ->map(fn ($id) => $productMap->get($id))
            ->filter()
            ->values();

        return response()->json($orderedProducts);
    }
}

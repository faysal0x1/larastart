<?php

namespace App\Http\Controllers;

use App\DTO\ProductCardData;
use App\Enums\PageSeoEnum;
use App\Helpers\SeoHelper;
use App\Models\Product;
use App\Modules\Cache\Services\SmartCacheService;
use App\Services\RouteResolver;
use App\Support\ImageCacheBuster;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function __construct(
        private readonly RouteResolver $routeResolver
    ) {
    }
    public function index()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::HOME);

        return Inertia::render('frontend/home/Index', [
            'seo' => $seo,
        ]);
    }

    public function productDetails($slug, Request $request)
    {
        $product = Product::with([
            'brand',
            'productReviews',
            'category',
            'tag',
            'subCategory',
            'childCategory',
            'wishlists',
            'seo',
            'variations',
            'specValues.attribute.group',
        ])
            ->select('*') // Ensure we get all columns including product_specs_data
            ->where('slug', $slug)
            ->first();

        // Set product in request attributes for middleware access
        if ($product) {
            $request->attributes->set('product', $product);
        }

        // Load media collections from Spatie Media Library
        if ($product) {
            $multiImages = $product->getMedia('multi_images')->map(function ($media) {
                return [
                    'id'    => $media->id,
                    'photo' => $media->getUrl(),
                    'url'   => $media->getUrl(),
                ];
            });

            $colorImages = $product->getMedia('color_images')->map(function ($media) {
                $colorAttributeId = $media->getCustomProperty('color_attribute_id');
                $colorAttribute   = null;

                if ($colorAttributeId) {
                    $colorAttribute = \App\Models\ColorAttribute::find($colorAttributeId);
                }

                return [
                    'id'                 => $media->id,
                    'image'              => $media->getUrl(),
                    'url'                => $media->getUrl(),
                    'color_attribute_id' => $colorAttributeId,
                    'color_attribute'    => $colorAttribute ? [
                        'id'   => $colorAttribute->id,
                        'name' => $colorAttribute->name,
                        'code' => $colorAttribute->code,
                    ] : null,
                ];
            });

            // Append media collections to product
            $product->multi_images = $multiImages;
            $product->color_images = $colorImages;
        }

        // Fetch 10 random products for similar products section
        $randomProducts = Product::with(['brand', 'productReviews', 'category'])
            ->where('id', '!=', $product->id ?? 0)
            ->where('status', 1)
            ->inRandomOrder()
            ->limit(10)
            ->get();

        $randomProductData = ProductCardData::collection($randomProducts, function (Product $p) {
            $multiImages = $p->getMedia('multi_images')->map(function ($media) {
                return [
                    'id'    => $media->id,
                    'photo' => $media->getUrl(),
                    'url'   => $media->getUrl(),
                ];
            })->values();

            return [
                'brand'           => $p->brand ? [
                    'id'   => $p->brand->id,
                    'name' => $p->brand->name,
                    'slug' => $p->brand->slug,
                ] : null,
                'category'        => $p->category ? [
                    'id'   => $p->category->id,
                    'name' => $p->category->name,
                    'slug' => $p->category->slug,
                ] : null,
                'product_reviews' => $p->productReviews?->values(),
                'multi_images'    => $multiImages,
            ];
        });

        // return response()->json([
        //     'products' => $product,
        // ]);

        $seo = $product ? SeoHelper::getProductSeo($product) : SeoHelper::getStaticPageSeo(PageSeoEnum::PRODUCT_DETAILS);

        // Pass user info for recommendations
        $user = $request->user();

        return Inertia::render('frontend/product/ProductDetailsPage', [
            'products'       => $product,
            'randomProducts' => $randomProductData,
            'seo'            => $seo,
            'user'           => $user ? [
                'id' => $user->id,
            ] : null,
        ]);
    }

    //Cart page
    public function shopcart()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::CART);

        return Inertia::render('cart/ShopCart', [
            'seo' => $seo,
        ]);
    }

    public function checkout()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::CHECKOUT);

        return Inertia::render('cart/Checkout', [
            'seo' => $seo,
        ]);
    }

    //Login & Register
    public function login()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::LOGIN);

        return Inertia::render('frontend/auth/LoginPage', [
            'seo' => $seo,
        ]);
    }

    public function register()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::REGISTER);

        return Inertia::render('frontend/auth/RegisterPage', [
            'seo' => $seo,
        ]);
    }

    public function forgotPassword()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::FORGOT_PASSWORD);

        return Inertia::render('frontend/auth/ForgotPasswordPage', [
            'seo' => $seo,
        ]);
    }

    //User Sidebar page

    public function addressBook()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::ADDRESS_BOOK);

        return Inertia::render('frontend/user/AddressBook', [
            'seo' => $seo,
        ]);
    }

    //Account page
    public function accountSettings()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::ACCOUNT_SETTINGS);

        return Inertia::render('frontend/user/AccountSettings', [
            'seo' => $seo,
        ]);
    }

    //Payment page
    public function paymentOptions()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::PAYMENT_OPTIONS);

        return Inertia::render('frontend/user/PaymentOptions', [
            'seo' => $seo,
        ]);
    }

    // client Dashboard

    public function Category()
    {
        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::CATEGORY);

        return Inertia::render('frontend/category/CategoryPage', [
            'seo' => $seo,
        ]);
    }

    public function AllProducts()
    {
        // dd(123);
        $products = SmartCacheService::remember('products', 'all_optimized', function () {
            return Product::select([
                'id',
                'name',
                'slug',
                'unit_price',
                'final_price',
                'discount_type',
                'discount_price',
                'call_for_price',
                'hot_deals',
                'special_offer',
                'product_thumbnail',
                'created_at',
                'updated_at', // Add updated_at for cache busting
            ])
                ->with([
                    'brand:id,name',
                    'category:id,name',
                    'subCategory:id,name',
                    'childCategory:id,name',
                    'tag:id,name',
                ])
                ->get();
        });

        $seo = SeoHelper::getStaticPageSeo(PageSeoEnum::ALL_PRODUCTS);

        return Inertia::render('frontend/allProduct/AllProductsPage', [
            'products' => $products,
            'seo'      => $seo,
        ]);
    }

    public function categoryProducts($categoryId)
    {
        $category = SmartCacheService::remember('categories', "info_{$categoryId}", function () use ($categoryId) {
            return \App\Models\Category::findOrFail($categoryId);
        });

        $products = SmartCacheService::remember('products', "category_{$categoryId}_optimized", function () use ($categoryId) {
            return Product::select([
                'id',
                'name',
                'slug',
                'unit_price',
                'final_price',
                'discount_type',
                'call_for_price',
                'discount_price',
                'hot_deals',
                'special_offer',
                'product_thumbnail',
                'created_at',
                'updated_at', // Add updated_at for cache busting
            ])
                ->with([
                    'brand:id,name',
                    'category:id,name',
                    'subCategory:id,name',
                    'childCategory:id,name',
                    'tag:id,name',
                ])
                ->where('category_id', $categoryId)
                ->get();
        });

        $seo = SeoHelper::getCategorySeo($category);

        return Inertia::render('frontend/category/CategoryProductsPage', [
            'products' => $products,
            'category' => $category,
            'seo'      => $seo,
        ]);
    }

    public function brandProducts($brandId)
    {
        $brand = SmartCacheService::remember('brands', "info_{$brandId}", function () use ($brandId) {
            return \App\Models\Brand::findOrFail($brandId);
        });

        $products = SmartCacheService::remember('products', "brand_{$brandId}_optimized", function () use ($brandId) {
            return Product::select([
                'id',
                'name',
                'slug',
                'unit_price',
                'final_price',
                'discount_type',
                'discount_price',
                'hot_deals',
                'call_for_price',
                'special_offer',
                'product_thumbnail',
                'created_at',
                'updated_at', // Add updated_at for cache busting
            ])
                ->with([
                    'brand:id,name',
                    'category:id,name',
                    'subCategory:id,name',
                    'childCategory:id,name',
                    'tag:id,name',
                ])
                ->where('brand_id', $brandId)
                ->get();
        });

        $seo = SeoHelper::getBrandSeo($brand);

        return Inertia::render('frontend/brand/BrandProductsPage', [
            'products' => $products,
            'brand'    => $brand,
            'seo'      => $seo,
        ]);
    }

    /**
     * Generate cache-busted image URL
     */
    public static function getCacheBustedImageUrl($imagePath, $updatedAt = null)
    {
        return ImageCacheBuster::fromPath($imagePath, $updatedAt);
    }

    //brand and category page
    public function categoryProductsPage(Request $request, $slug, $subcategorySlug = null, $childcategorySlug = null)
    {
        $perPage = $request->get('per_page', 12);
        $page    = $request->get('page', 1);

        // Determine which category to load based on the parameters
        if ($childcategorySlug) {
            // Three-level hierarchy: category/subcategory/childcategory
            $category = \App\Models\Category::where('slug', $childcategorySlug)
                ->whereHas('parent', function ($query) use ($subcategorySlug, $slug) {
                    $query->where('slug', $subcategorySlug)
                        ->whereHas('parent', function ($parentQuery) use ($slug) {
                            $parentQuery->where('slug', $slug);
                        });
                })
                ->firstOrFail();

            $parentCategory = \App\Models\Category::where('slug', $subcategorySlug)
                ->whereHas('parent', function ($query) use ($slug) {
                    $query->where('slug', $slug);
                })
                ->firstOrFail();

            $grandParentCategory = \App\Models\Category::where('slug', $slug)->firstOrFail();

            // Get products for child category level with pagination
            $products = $this->getProductsByCategoryLevelPaginated($grandParentCategory->id, $parentCategory->id, $category->id, $perPage, $page);

        } elseif ($subcategorySlug) {
            // Two-level hierarchy: category/subcategory
            $category = \App\Models\Category::where('slug', $subcategorySlug)
                ->whereHas('parent', function ($query) use ($slug) {
                    $query->where('slug', $slug);
                })
                ->firstOrFail();

            $parentCategory = \App\Models\Category::where('slug', $slug)->firstOrFail();

            // Get products for subcategory level with pagination
            $products = $this->getProductsByCategoryLevelPaginated($parentCategory->id, $category->id, null, $perPage, $page);

        } else {
            // Single level: category
            $category = \App\Models\Category::where('slug', $slug)->firstOrFail();

            // Get products for main category level with pagination
            $products = $this->getProductsByCategoryLevelPaginated($category->id, null, null, $perPage, $page);
        }

        // Build breadcrumb hierarchy
        $breadcrumbs = $this->buildCategoryBreadcrumbs($category);

        // Load subcategories/child categories if they exist
        $subCategories = \App\Models\Category::where('parent_id', $category->id)
            ->with(['parent.parent']) // Load parent chain for nested URLs (up to 3 levels)
            ->where(function ($query) {
                $query->where('status', 1)
                    ->orWhere('is_active', true);
            })
            ->orderBy('priority', 'asc')
            ->orderBy('name', 'asc')
            ->get()
            ->map(function ($subCategory) {
                // Build the full URL for the subcategory using slugs (traverses parent chain)
                $subCategoryUrl = $this->buildCategoryUrl($subCategory);

                return [
                    'id'          => $subCategory->id,
                    'name'        => $subCategory->name,
                    'slug'        => $subCategory->slug,
                    'image_url'   => $subCategory->image_url,
                    'description' => $subCategory->description,
                    'level'       => $subCategory->level,
                    'url'         => $subCategoryUrl,
                ];
            });

        $seo = SeoHelper::getCategorySeo($category);

        return Inertia::render('frontend/category/CategoryProductsPage', [
            'products'      => $products,
            'category'      => $category,
            'subCategories' => $subCategories,
            'breadcrumbs'   => $breadcrumbs,
            'seo'           => $seo,
        ]);
    }

    /**
     * Get products based on category hierarchy level
     *
     * @param int $categoryId Main category ID
     * @param int|null $subcategoryId Subcategory ID (null if not applicable)
     * @param int|null $childCategoryId Child category ID (null if not applicable)
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function getProductsByCategoryLevel($categoryId, $subcategoryId = null, $childCategoryId = null)
    {
        $query = Product::with([
            'brand',
            'productReviews',
            'category',
            'tag',
            'subCategory',
            'childCategory',
            'wishlists',
            'seo',
            'variations',
            'specValues',
            'specValues.attribute',
        ])
            ->where('status', 1); // Only active products

        if ($childCategoryId) {
            $query->where('child_category_id', $childCategoryId);
        } elseif ($subcategoryId) {
            $query->where('subcategory_id', $subcategoryId);
        } else {
            $query->where('category_id', $categoryId);
        }

        return $query->get()->map(function ($product) {
            // Load media collections from Spatie Media Library
            $multiImages = $product->getMedia('multi_images')->map(function ($media) {
                return [
                    'id'    => $media->id,
                    'photo' => $media->getUrl(),
                    'url'   => $media->getUrl(),
                ];
            });

            $colorImages = $product->getMedia('color_images')->map(function ($media) {
                $colorAttributeId = $media->getCustomProperty('color_attribute_id');
                $colorAttribute   = null;

                if ($colorAttributeId) {
                    $colorAttribute = \App\Models\ColorAttribute::find($colorAttributeId);
                }

                return [
                    'id'                 => $media->id,
                    'image'              => $media->getUrl(),
                    'url'                => $media->getUrl(),
                    'color_attribute_id' => $colorAttributeId,
                    'color_attribute'    => $colorAttribute ? [
                        'id'   => $colorAttribute->id,
                        'name' => $colorAttribute->name,
                        'code' => $colorAttribute->code,
                    ] : null,
                ];
            });

            $product->multi_images = $multiImages;
            $product->color_images = $colorImages;
            return $product;
        });
    }

    /**
     * Get paginated products based on category hierarchy level
     *
     * @param int $categoryId Main category ID
     * @param int|null $subcategoryId Subcategory ID (null if not applicable)
     * @param int|null $childCategoryId Child category ID (null if not applicable)
     * @param int $perPage Items per page
     * @param int $page Current page
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    private function getProductsByCategoryLevelPaginated($categoryId, $subcategoryId = null, $childCategoryId = null, $perPage = 12, $page = 1)
    {
        $query = Product::with([
            'brand',
            'productReviews',
            'category',
            'tag',
            'subCategory',
            'childCategory',
            'wishlists',
            'seo',
            'variations',
            'specValues',
            'specValues.attribute',
        ])
            ->where('status', 1); // Only active products

        if ($childCategoryId) {
            $query->where('child_category_id', $childCategoryId);
        } elseif ($subcategoryId) {
            $query->where('subcategory_id', $subcategoryId);
        } else {
            $query->where('category_id', $categoryId);
        }

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        // Map products to include media collections
        $paginator->getCollection()->transform(function ($product) {
            // Load media collections from Spatie Media Library
            $multiImages = $product->getMedia('multi_images')->map(function ($media) {
                return [
                    'id'    => $media->id,
                    'photo' => $media->getUrl(),
                    'url'   => $media->getUrl(),
                ];
            });

            $colorImages = $product->getMedia('color_images')->map(function ($media) {
                $colorAttributeId = $media->getCustomProperty('color_attribute_id');
                $colorAttribute   = null;

                if ($colorAttributeId) {
                    $colorAttribute = \App\Models\ColorAttribute::find($colorAttributeId);
                }

                return [
                    'id'                 => $media->id,
                    'image'              => $media->getUrl(),
                    'url'                => $media->getUrl(),
                    'color_attribute_id' => $colorAttributeId,
                    'color_attribute'    => $colorAttribute ? [
                        'id'   => $colorAttribute->id,
                        'name' => $colorAttribute->name,
                        'code' => $colorAttribute->code,
                    ] : null,
                ];
            });

            $product->multi_images = $multiImages;
            $product->color_images = $colorImages;
            return $product;
        });

        return $paginator;
    }

    /**
     * Build breadcrumb hierarchy for category navigation
     */
    private function buildCategoryBreadcrumbs($category)
    {
        $breadcrumbs = [];

        // Add current category
        $breadcrumbs[] = [
            'name'    => $category->name,
            'slug'    => $category->slug,
            'url'     => $this->buildCategoryUrl($category),
            'current' => true,
        ];

        // Add parent categories
        $current = $category;
        while ($current->parent) {
            $current = $current->parent;
            array_unshift($breadcrumbs, [
                'name'    => $current->name,
                'slug'    => $current->slug,
                'url'     => $this->buildCategoryUrl($current),
                'current' => false,
            ]);
        }

        return $breadcrumbs;
    }

    /**
     * Build the full hierarchical URL for a category
     */
    private function buildCategoryUrl($category)
    {
        $segments = [];
        $current  = $category;

        // Build segments from child to parent
        while ($current) {
            array_unshift($segments, $current->slug);
            $current = $current->parent;
        }

        return '/' . implode('/', $segments);
    }

    /**
     * Unified slug route handler
     * Checks slug against products, brands, and categories
     */
    public function slugRoute(Request $request, $slug)
    {
        $product = Product::with([
            'brand',
            'productReviews',
            'category',
            'tag',
            'subCategory',
            'childCategory',
            'wishlists',
            'seo',
            'variations',
            'specValues.attribute.group',
        ])
            ->where('slug', $slug)
            ->first();

        // Set product in request attributes for middleware access
        if ($product) {
            $request->attributes->set('product', $product);
        }

        if ($product) {
            $multiImages = $product->getMedia('multi_images')->map(function ($media) {
                return [
                    'id'    => $media->id,
                    'photo' => $media->getUrl(),
                    'url'   => $media->getUrl(),
                ];
            });

            $colorImages = $product->getMedia('color_images')->map(function ($media) {
                $colorAttributeId = $media->getCustomProperty('color_attribute_id');
                $colorAttribute   = null;

                if ($colorAttributeId) {
                    $colorAttribute = \App\Models\ColorAttribute::find($colorAttributeId);
                }

                return [
                    'id'                 => $media->id,
                    'image'              => $media->getUrl(),
                    'url'                => $media->getUrl(),
                    'color_attribute_id' => $colorAttributeId,
                    'color_attribute'    => $colorAttribute ? [
                        'id'   => $colorAttribute->id,
                        'name' => $colorAttribute->name,
                        'code' => $colorAttribute->code,
                    ] : null,
                ];
            });

            // Append media collections to product
            $product->multi_images = $multiImages;
            $product->color_images = $colorImages;

            // Fetch 10 random products for similar products section
            $randomProducts = Product::with(['brand', 'productReviews', 'category'])
                ->where('id', '!=', $product->id)
                ->where('status', 1)
                ->inRandomOrder()
                ->limit(10)
                ->get()
                ->map(function ($p) {
                    // Load media for each product
                    $multiImages = $p->getMedia('multi_images')->map(function ($media) {
                        return [
                            'id'    => $media->id,
                            'photo' => $media->getUrl(),
                            'url'   => $media->getUrl(),
                        ];
                    });
                    $p->multi_images = $multiImages;
                    return $p;
                });

            $seo = SeoHelper::getProductSeo($product);

            // Pass user info for recommendations
            $user = $request->user();

            return Inertia::render('frontend/product/ProductDetailsPage', [
                'products'       => $product,
                'randomProducts' => $randomProducts,
                'meta'           => $seo, // Pass as 'meta' to match blade template expectation
                'seo'            => $seo, // Keep 'seo' for backward compatibility
                'user'           => $user ? [
                    'id' => $user->id,
                ] : null,
            ]);
        }

        // Second, check if it's a brand
        $brand = \App\Models\Brand::where('slug', $slug)->first();

        if ($brand) {
            $perPage = request()->get('per_page', 12);
            $page    = request()->get('page', 1);

            $products = $this->getProductsByBrandPaginated($brand->id, $perPage, $page);

            $seo = SeoHelper::getBrandSeo($brand);

            return Inertia::render('frontend/brand/BrandProductsPage', [
                'products' => $products,
                'brand'    => $brand,
                'meta'     => $seo, // Pass as 'meta' to match blade template expectation
                'seo'      => $seo, // Keep 'seo' for backward compatibility
            ]);
        }

        // Third, check if it's a category
        $category = \App\Models\Category::where('slug', $slug)->first();

        if ($category) {
            $perPage = request()->get('per_page', 12);
            $page    = request()->get('page', 1);

            $products = $this->getProductsByCategoryLevelPaginated($category->id, null, null, $perPage, $page);

            $breadcrumbs = $this->buildCategoryBreadcrumbs($category);

            // Load subcategories/child categories if they exist
            $subCategories = \App\Models\Category::where('parent_id', $category->id)
                ->with(['parent.parent']) // Load parent chain for nested URLs (up to 3 levels)
                ->where(function ($query) {
                    $query->where('status', 1)
                        ->orWhere('is_active', true);
                })
                ->orderBy('priority', 'asc')
                ->orderBy('name', 'asc')
                ->get()
                ->map(function ($subCategory) {
                    // Build the full URL for the subcategory using slugs (traverses parent chain)
                    $subCategoryUrl = $this->buildCategoryUrl($subCategory);

                    return [
                        'id'          => $subCategory->id,
                        'name'        => $subCategory->name,
                        'slug'        => $subCategory->slug,
                        'image_url'   => $subCategory->image_url,
                        'description' => $subCategory->description,
                        'level'       => $subCategory->level,
                        'url'         => $subCategoryUrl,
                    ];
                });

            $seo = SeoHelper::getCategorySeo($category);

            return Inertia::render('frontend/category/CategoryProductsPage', [
                'products'      => $products,
                'category'      => $category,
                'subCategories' => $subCategories,
                'breadcrumbs'   => $breadcrumbs,
                'meta'          => $seo, // Pass as 'meta' to match blade template expectation
                'seo'           => $seo, // Keep 'seo' for backward compatibility
            ]);
        }

        // Fourth, delegate to route resolver (static pages or aliases)
        if ($resolved = $this->routeResolver->resolveSlug($request, $slug)) {
            return $resolved;
        }

        // If nothing matches, return 404 page
        return Inertia::render('Errors/NotFound', [
            'message'       => 'The page you requested could not be found.',
            'requestedSlug' => $slug,
        ])->toResponse($request)->setStatusCode(404);
    }

    public function brandProductsPage(Request $request, $slug)
    {
        $brand = \App\Models\Brand::where('slug', $slug)->firstOrFail();

        $perPage = $request->get('per_page', 12);
        $page    = $request->get('page', 1);

        $products = $this->getProductsByBrandPaginated($brand->id, $perPage, $page);

        $seo = SeoHelper::getBrandSeo($brand);

        return Inertia::render('frontend/brand/BrandProductsPage', [
            'products' => $products,
            'brand'    => $brand,
            'seo'      => $seo,
        ]);
    }

    /**
     * Get paginated products by brand
     *
     * @param int $brandId Brand ID
     * @param int $perPage Items per page
     * @param int $page Current page
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    private function getProductsByBrandPaginated($brandId, $perPage = 12, $page = 1)
    {
        $query = Product::with([
            'brand',
            'productReviews',
            'category',
            'tag',
            'subCategory',
            'wishlists',
            'seo',
            'variations',
            'specValues',
            'specValues.attribute',
        ])
            ->where('brand_id', $brandId)
            ->where('status', 1); // Only active products

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        // Map products to include media collections
        $paginator->getCollection()->transform(function ($product) {
            // Load media collections from Spatie Media Library
            $multiImages = $product->getMedia('multi_images')->map(function ($media) {
                return [
                    'id'    => $media->id,
                    'photo' => $media->getUrl(),
                    'url'   => $media->getUrl(),
                ];
            });

            $colorImages = $product->getMedia('color_images')->map(function ($media) {
                $colorAttributeId = $media->getCustomProperty('color_attribute_id');
                $colorAttribute   = null;

                if ($colorAttributeId) {
                    $colorAttribute = \App\Models\ColorAttribute::find($colorAttributeId);
                }

                return [
                    'id'                 => $media->id,
                    'image'              => $media->getUrl(),
                    'url'                => $media->getUrl(),
                    'color_attribute_id' => $colorAttributeId,
                    'color_attribute'    => $colorAttribute ? [
                        'id'   => $colorAttribute->id,
                        'name' => $colorAttribute->name,
                        'code' => $colorAttribute->code,
                    ] : null,
                ];
            });

            $product->multi_images = $multiImages;
            $product->color_images = $colorImages;
            return $product;
        });

        return $paginator;
    }
}
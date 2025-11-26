<?php
namespace App\Http\Middleware;

use App\Enums\PageSeoEnum;
use App\Helpers\SeoHelper;
use App\Modules\Cache\Services\SmartCacheService;
use App\Modules\SiteSetting\Repositories\SiteSettingRepository;
use App\Modules\StaticPage\Repositories\StaticPageRepository;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
             ...parent::share($request),
            'name'                  => config('app.name'),
            'quote'                 => ['message' => trim($message), 'author' => trim($author)],
            'auth'                  => [
                'user'        => $request->user(),
                'roles'       => $request->user()
                    ? $request->user()->roles->pluck('name')
                    : [],
                'permissions' => $request->user()
                    ? $request->user()->getAllPermissions()->pluck('name')
                    : [],
            ],
            'cart'                  => $this->getCartData($request),
            'errors'                => function () use ($request) {
                return $request->session()->get('errors')
                    ? $request->session()->get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
            'flash'                 => [
                'success' => $request->session()->get('success'),
                'message' => $request->session()->get('message'),
            ],
            // 'ziggy'                 => fn(): array                => [
            //      ...(new Ziggy)->toArray(),
            //     'location' => $request->url(),
            // ],
            'meta'                  => $this->getMeta($request),
            'siteSeo'               => $this->getSiteSeo(),
            'siteSettings'          => $this->getSiteSettings(),
            'serviceWorker'         => [
                'enabled'      => config('service-worker.enabled', false),
                'cache'        => config('service-worker.cache', 'full'),
                'cacheImages'  => config('service-worker.cache_images', true),
                'cacheApi'     => config('service-worker.cache_api', false),
                'maxCacheSize' => config('service-worker.max_cache_size', 100),
                'cacheVersion' => config('service-worker.cache_version', '1'),
            ],
            'frontendCategoryCache' => [
                'enabled'    => config('frontend-cache.enabled', true),
                'ttlMinutes' => config('frontend-cache.ttl_minutes', 5),
            ],
        ];
    }

    protected function getMeta(Request $request): array
    {
        try {
            $routeName = $request->route()?->getName();
            $path      = $request->getPathInfo();

            // Unified slug route - check products, brands, then categories
            if (preg_match('/^\/[a-z0-9-]+$/i', $path) && $routeName === 'web.slug') {
                $slug = ltrim($path, '/');

                // First check product
                $product = \App\Models\Product::where('slug', $slug)->first();
                if ($product) {
                    return SeoHelper::getProductSeo($product);
                }

                // Then check brand
                $brand = \App\Models\Brand::where('slug', $slug)->first();
                if ($brand) {
                    return SeoHelper::getBrandSeo($brand);
                }

                // Finally check category
                $category = \App\Models\Category::where('slug', $slug)->first();
                if ($category) {
                    return SeoHelper::getCategorySeo($category);
                }
            }

            $slugCandidate = ltrim($path, '/');
            if ($slugCandidate) {
                /** @var StaticPageRepository $staticPages */
                $staticPages = app(StaticPageRepository::class);
                if ($staticPage = $staticPages->findBySlug($slugCandidate)) {
                    return SeoHelper::forStaticPage($staticPage);
                }
            }

            // Static pages based on route name
            $pageEnum = match ($routeName) {
                'home'            => PageSeoEnum::HOME,
                'products.index'  => PageSeoEnum::ALL_PRODUCTS,
                'category.memory' => PageSeoEnum::CATEGORY,
                default           => null,
            };

            // Fallback to path-based detection for other pages
            if (! $pageEnum) {
                $pageEnum = match ($path) {
                    '/all-products' => PageSeoEnum::ALL_PRODUCTS,
                    '/category'     => PageSeoEnum::CATEGORY,
                    '/cart', '/shopcart'                  => PageSeoEnum::CART,
                    '/checkout'     => PageSeoEnum::CHECKOUT,
                    '/login'        => PageSeoEnum::LOGIN,
                    '/register'     => PageSeoEnum::REGISTER,
                    '/forgot-password', '/password/reset' => PageSeoEnum::FORGOT_PASSWORD,
                    '/address-book' => PageSeoEnum::ADDRESS_BOOK,
                    '/account-settings', '/account'       => PageSeoEnum::ACCOUNT_SETTINGS,
                    '/payment-options', '/payment'        => PageSeoEnum::PAYMENT_OPTIONS,
                    default         => PageSeoEnum::HOME,
                };
            }

            return SeoHelper::getStaticPageSeo($pageEnum);
        } catch (\Exception $e) {
            // Fallback to default SEO on any error
            return SeoHelper::getStaticPageSeo(PageSeoEnum::HOME);
        }
    }

    /**
     * Get SiteSeo data with caching.
     * Uses SeoHelper to get SiteSeo as array for Inertia pages.
     */
    protected function getSiteSeo(): ?array
    {
        return SeoHelper::getSiteSeoArray();
    }

    protected function getSiteSettings(): ?array
    {
        try {
            return SmartCacheService::remember('static', 'site_settings', function () {
                /** @var SiteSettingRepository $repository */
                $repository = app(SiteSettingRepository::class);
                $siteSetting = $repository->getOrCreate();

                if (! $siteSetting) {
                    return null;
                }

                $data = $siteSetting->toArray();
                $data['social_links'] = $siteSetting->socialLinks
                    ? $siteSetting->socialLinks
                        ->filter(fn ($link) => (bool) ($link->is_active ?? true))
                        ->sortBy('order')
                        ->values()
                        ->map(function ($link) {
                            return [
                                'id'       => $link->id,
                                'platform' => $link->platform,
                                'url'      => $link->url,
                                'icon'     => $link->icon,
                                'order'    => $link->order,
                            ];
                        })
                        ->toArray()
                    : [];

                return $data;
            });
        } catch (\Throwable $e) {
            return null;
        }
    }

    protected function getCartData(Request $request): array
    {
        try {
            $cartService = app(\App\Modules\Cart\Services\CartService::class);
            $sessionId   = $request->cookies->get('cart_session');
            $userId      = $request->user()?->id;

            $cart = $cartService->getOrCreateCart($sessionId, $userId);
            $cart->load(['items.product']);

            // Calculate totals properly
            $totalItems  = $cart->items->sum('quantity');
            $totalAmount = $cart->items->sum(function ($item) {
                return (float) $item->total_price;
            });

            return [
                'id'           => $cart->id,
                'items'        => $cart->items->map(function ($item) {
                    return [
                        'id'          => $item->id,
                        'product_id'  => $item->product_id,
                        'quantity'    => (int) $item->quantity,
                        'unit_price'  => (float) $item->unit_price,
                        'total_price' => (float) $item->total_price,
                        'product'     => $item->product ? [
                            'id'          => $item->product->id,
                            'name'        => $item->product->name,
                            'slug'        => $item->product->slug,
                            'image_url'   => $item->product->image_url,
                            'final_price' => (float) $item->product->final_price,
                        ] : null,
                    ];
                }),
                'total_items'  => $totalItems,
                'total'        => $totalAmount,
                'total_amount' => $totalAmount,
                'currency'     => 'BDT',
            ];
        } catch (\Exception $e) {
            // Return empty cart data if there's an error
            return [
                'id'           => null,
                'items'        => [],
                'total_items'  => 0,
                'total'        => 0,
                'total_amount' => 0,
                'currency'     => 'BDT',
            ];
        }
    }
}
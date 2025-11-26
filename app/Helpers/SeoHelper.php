<?php
namespace App\Helpers;

use App\Enums\PageSeoEnum;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Modules\SeoManager\Services\SeoManager;
use App\Modules\StaticPage\Models\StaticPage;

class SeoHelper
{
    protected static ?array $siteBrandAssets = null;
    protected static ?SeoManager $seoManagerInstance = null;
    protected static bool $seoManagerResolved = false;

    /**
     * Get SEO data for a static/page-enum context with overrides.
     */
    public static function getStaticPageSeo(PageSeoEnum $page): array
    {
        $defaults = self::buildStaticPageDefaults($page);
        $contextKey = sprintf('page::%s', $page->value);
        $contextSeo = self::seoManager()?->forContext($contextKey) ?? [];

        return self::mergeSeo($defaults, $contextSeo);
    }

    protected static function buildStaticPageDefaults(PageSeoEnum $page): array
    {
        $baseUrl     = rtrim(config('app.url'), '/');
        $siteName    = config('app.name', 'TBZ');
        $currentPath = request()->getPathInfo();
        $currentUrl  = $baseUrl . $currentPath;

        $siteSeo    = static::getSiteSeo();
        $siteAssets = static::getSiteBrandAssets();
        $logoFallback = $siteAssets['logo'] ?? ($baseUrl . '/logo.svg');

        $ogImageSource      = $siteSeo?->og_image_url ?? $siteSeo?->og_image ?? $logoFallback;
        $twitterImageSource = $siteSeo?->twitter_image_url ?? $siteSeo?->twitter_image ?? $ogImageSource;

        return [
            'title'               => $page->getMetaTitle(),
            'description'         => $page->getMetaDescription(),
            'keywords'            => $page->getMetaKeywords(),
            'og_title'            => $siteSeo?->og_title ?? $page->getMetaTitle(),
            'og_description'      => $siteSeo?->og_description ?? $page->getMetaDescription(),
            'og_type'             => $page->getOgType(),
            'og_url'              => $siteSeo?->og_url ?? $currentUrl,
            'og_site_name'        => $siteSeo?->og_site_name ?? $siteName,
            'og_image'            => $ogImageSource,
            'og_image_alt'        => $siteSeo?->og_image_alt ?? $page->getMetaTitle(),
            'og_locale'           => $siteSeo?->og_locale ?? 'en_US',
            'twitter_card'        => $siteSeo?->twitter_card ?? 'summary_large_image',
            'twitter_title'       => $siteSeo?->twitter_title ?? $page->getMetaTitle(),
            'twitter_description' => $siteSeo?->twitter_description ?? $page->getMetaDescription(),
            'twitter_image'       => $twitterImageSource,
            'twitter_site'        => $siteSeo?->twitter_site ?? null,
            'twitter_creator'     => $siteSeo?->twitter_creator ?? null,
            'canonical'           => $page->getCanonicalUrl() ?? $currentUrl,
            'robots'              => $page->getRobots(),
            'schema_markup'       => $siteSeo?->schema_markup ?? null,
        ];
    }

    public static function forStaticPage(StaticPage $page): array
    {
        $baseUrl    = rtrim(config('app.url'), '/');
        $siteName   = config('app.name', 'TBZ');
        $slug       = ltrim((string) $page->slug, '/');
        $currentUrl = $slug ? "{$baseUrl}/{$slug}" : url()->current();

        $siteAssets   = static::getSiteBrandAssets();
        $logoFallback = $siteAssets['logo'] ?? ($baseUrl . '/logo.svg');
        $summary      = strip_tags($page->summary ?? '') ?: $page->title;

        $defaults = [
            'title'               => $page->title,
            'description'         => $summary,
            'keywords'            => $page->meta_keywords ?? '',
            'canonical'           => $page->canonical_url ?? $currentUrl,
            'robots'              => $page->robots ?? 'index, follow',
            'og_title'            => $page->title,
            'og_description'      => $summary,
            'og_type'             => $page->og_type ?? 'website',
            'og_url'              => $page->og_url ?? $currentUrl,
            'og_site_name'        => $page->og_site_name ?? $siteName,
            'og_image'            => static::formatAssetUrl($page->og_image_url ?? $page->og_image) ?? $logoFallback,
            'og_image_alt'        => $page->og_image_alt ?? $page->title,
            'twitter_card'        => $page->twitter_card ?? 'summary_large_image',
            'twitter_title'       => $page->twitter_title ?? $page->title,
            'twitter_description' => $page->twitter_description ?? $summary,
            'twitter_image'       => static::formatAssetUrl(
                $page->twitter_image_url ?? $page->twitter_image ?? $page->og_image_url ?? $page->og_image
            ) ?? $logoFallback,
        ];

        $modelSeo = method_exists($page, 'getSeoAttributesPayload')
            ? $page->getSeoAttributesPayload([])
            : [];

        $contextKey = $slug ? sprintf('static::%s', $slug) : null;
        $contextSeo = self::seoManager()?->forContext($contextKey) ?? [];

        $merged = self::mergeSeo($defaults, $modelSeo, $contextSeo);

        if (! isset($merged['og_url'])) {
            $merged['og_url'] = $currentUrl;
        }

        if (! isset($merged['canonical'])) {
            $merged['canonical'] = $currentUrl;
        }

        if (! isset($merged['og_site_name'])) {
            $merged['og_site_name'] = $siteName;
        }

        if (! isset($merged['twitter_image'])) {
            $merged['twitter_image'] = $merged['og_image'] ?? $logoFallback;
        }

        if (! isset($merged['twitter_card'])) {
            $merged['twitter_card'] = 'summary_large_image';
        }

        if (! isset($merged['twitter_title'])) {
            $merged['twitter_title'] = $merged['title'] ?? $page->title;
        }

        if (! isset($merged['twitter_description'])) {
            $merged['twitter_description'] = $merged['description'] ?? $summary;
        }

        return $merged;
    }

    protected static function seoManager(): ?SeoManager
    {
        if (! self::$seoManagerResolved) {
            self::$seoManagerResolved = true;

            try {
                self::$seoManagerInstance = app(SeoManager::class);
            } catch (\Throwable $e) {
                self::$seoManagerInstance = null;
            }
        }

        return self::$seoManagerInstance;
    }

    protected static function mergeSeo(array ...$groups): array
    {
        $merged = [];

        foreach ($groups as $group) {
            foreach ($group as $key => $value) {
                if ($value === null || $value === '') {
                    continue;
                }

                $merged[$key] = $value;
            }
        }

        return $merged;
    }

    /**
     * Get SiteSeo data from cache (helper method)
     * Returns the SiteSeo model object
     */
    public static function getSiteSeo(): ?object
    {
        static $siteSeo = null;

        if ($siteSeo === null) {
            try {
                $siteSeo = \App\Modules\Cache\Services\SmartCacheService::remember('static', 'site_seo', function () {
                    $siteSeoRepository = app(\App\Modules\SiteSeo\Repositories\SiteSeoRepository::class);
                    return $siteSeoRepository->getOrCreate();
                });
            } catch (\Exception $e) {
                $siteSeo = false; // Cache failure to avoid repeated attempts
            }
        }

        return $siteSeo ?: null;
    }

    /**
     * Get SiteSeo data as array (for Inertia/JSON responses)
     */
    public static function getSiteSeoArray(): ?array
    {
        $siteSeo = self::getSiteSeo();

        if (!$siteSeo) {
            return null;
        }

        return [
            // Basic Meta Tags
            'meta_title'       => $siteSeo->meta_title,
            'meta_author'      => $siteSeo->meta_author,
            'meta_keyword'     => $siteSeo->meta_keyword,
            'meta_description' => $siteSeo->meta_description,
            'meta_robots'      => $siteSeo->meta_robots,
            'canonical_url'    => $siteSeo->canonical_url,

            // Open Graph Tags
            'og_title'         => $siteSeo->og_title,
            'og_description'   => $siteSeo->og_description,
            'og_type'          => $siteSeo->og_type,
            'og_url'           => $siteSeo->og_url,
            'og_image'         => $siteSeo->og_image,
            'og_image_url'     => $siteSeo->og_image_url,
            'og_image_alt'     => $siteSeo->og_image_alt,
            'og_site_name'     => $siteSeo->og_site_name,
            'og_locale'        => $siteSeo->og_locale,

            // Twitter Card Tags
            'twitter_card'        => $siteSeo->twitter_card,
            'twitter_title'       => $siteSeo->twitter_title,
            'twitter_description' => $siteSeo->twitter_description,
            'twitter_image'       => $siteSeo->twitter_image,
            'twitter_image_url'   => $siteSeo->twitter_image_url,
            'twitter_site'        => $siteSeo->twitter_site,
            'twitter_creator'     => $siteSeo->twitter_creator,

            // Favicon and Icons
            'favicon'          => $siteSeo->favicon,
            'favicon_url'      => $siteSeo->favicon_url,
            'apple_touch_icon' => $siteSeo->apple_touch_icon,
            'apple_touch_icon_url' => $siteSeo->apple_touch_icon_url,
            'manifest_icon'    => $siteSeo->manifest_icon,
            'manifest_icon_url' => $siteSeo->manifest_icon_url,

            // Additional Meta
            'theme_color' => $siteSeo->theme_color,
            'author'      => $siteSeo->author,
            'copyright'   => $siteSeo->copyright,
            'language'    => $siteSeo->language,

            // Structured Data
            'schema_markup' => $siteSeo->schema_markup,

            // Tracking Scripts
            'google_analytics'            => $siteSeo->google_analytics,
            'fb_pixel_id'                => $siteSeo->fb_pixel_id,
            'additional_tracking_scripts' => $siteSeo->additional_tracking_scripts,
        ];
    }

    /**
     * Get SEO data for a product page
     */
    public static function getProductSeo(Product $product): array
    {
        $baseUrl  = config('app.url');
        $siteName = config('app.name', 'TBZ');

        // Use ProductSeo if available, otherwise generate from product data
        $seo = $product->seo;

        $title       = $seo?->meta_title ?? $product->name . ' | TBZ';
        $description = $seo?->meta_description ?? $product->short_descp ?? substr($product->long_descp ?? '', 0, 160) ?? 'Buy ' . $product->name . ' online at TBZ. Best prices and fast delivery in Bangladesh.';
        $keywords    = $seo?->meta_keywords ?? ($seo?->meta_tags ?? ($product->tags ?? ''));

        // Get product image
        $siteAssets = static::getSiteBrandAssets();
        $logoFallback = $siteAssets['logo'] ?? ($baseUrl . '/placeholder.svg');

        $image =  $product->image_url ?? $product->product_thumbnail ?? $logoFallback;
        if (! str_starts_with($image, 'http')) {
            $image = $baseUrl . ($image[0] === '/' ? $image : '/' . $image);
        }

        $url = $baseUrl . '/' . $product->slug;

        return [
            'title'                => $title,
            'description'          => $description,
            'keywords'             => $keywords,
            'og_title'             => $title,
            'og_description'       => $description,
            'og_type'              => 'product',
            'og_url'               => $url,
            'og_site_name'         => $siteName,
            'og_image'             => $image,
            'og_image_alt'         => $product->name,
            'twitter_card'         => 'summary_large_image',
            'twitter_title'        => $title,
            'twitter_description'  => $description,
            'twitter_image'        => $image,
            'canonical'            => $url,
            'robots'               => 'index, follow',
            'product_price'        => $product->final_price ?? $product->unit_price,
            'product_currency'     => 'BDT',
            'product_availability' => ($product->stock > 0 || $product->qty > 0) ? 'in stock' : 'out of stock',
        ];
    }

    /**
     * Get SEO data for a category page
     */
    public static function getCategorySeo(Category $category): array
    {
        $baseUrl  = config('app.url');
        $siteName = config('app.name', 'TBZ');

        $title       = $category->meta_title ?? $category->name . ' - Shop Online | TBZ';
        $description = $category->meta_description ?? $category->description ?? 'Browse ' . $category->name . ' products at TBZ. Find the best deals and latest products in this category.';
        $keywords    = $category->name . ', products, shopping, TBZ, online shopping, Bangladesh';

        // Get category image
        $siteAssets = static::getSiteBrandAssets();
        $logoFallback = $siteAssets['logo'] ?? ($baseUrl . '/logo.svg');

        $image = $category->meta_image ?? $category->image_url ?? $logoFallback;
        if (! str_starts_with($image, 'http')) {
            $image = $baseUrl . ($image[0] === '/' ? $image : '/' . $image);
        }

        $url = $baseUrl . request()->getPathInfo();

        return [
            'title'               => $title,
            'description'         => $description,
            'keywords'            => $keywords,
            'og_title'            => $title,
            'og_description'      => $description,
            'og_type'             => 'website',
            'og_url'              => $url,
            'og_site_name'        => $siteName,
            'og_image'            => $image,
            'og_image_alt'        => $category->name,
            'twitter_card'        => 'summary_large_image',
            'twitter_title'       => $title,
            'twitter_description' => $description,
            'twitter_image'       => $image,
            'canonical'           => $url,
            'robots'              => 'index, follow',
        ];
    }

    /**
     * Get SEO data for a brand page
     */
    public static function getBrandSeo(Brand $brand): array
    {
        $baseUrl  = config('app.url');
        $siteName = config('app.name', 'TBZ');

        $title       = $brand->name . ' Products - Shop Online | TBZ';
        $description = $brand->description ?? 'Browse authentic ' . $brand->name . ' products at TBZ. Best prices, warranty, and excellent customer service.';
        $keywords    = $brand->name . ', products, authentic, warranty, TBZ, online shopping';

        // Get brand image
        $siteAssets = static::getSiteBrandAssets();
        $logoFallback = $siteAssets['logo'] ?? ($baseUrl . '/logo.svg');

        $image = $brand->image_url ?? $logoFallback;
        if (! str_starts_with($image, 'http')) {
            $image = $baseUrl . ($image[0] === '/' ? $image : '/' . $image);
        }

        $url = $baseUrl . request()->getPathInfo();

        return [
            'title'               => $title,
            'description'         => $description,
            'keywords'            => $keywords,
            'og_title'            => $title,
            'og_description'      => $description,
            'og_type'             => 'website',
            'og_url'              => $url,
            'og_site_name'        => $siteName,
            'og_image'            => $image,
            'og_image_alt'        => $brand->name . ' Products',
            'twitter_card'        => 'summary_large_image',
            'twitter_title'       => $title,
            'twitter_description' => $description,
            'twitter_image'       => $image,
            'canonical'           => $url,
            'robots'              => 'index, follow',
        ];
    }

    /**
     * Resolve cached logo/icon URLs from SiteSetting (if available).
     */
    protected static function getSiteBrandAssets(): array
    {
        if (static::$siteBrandAssets !== null) {
            return static::$siteBrandAssets;
        }

        try {
            $siteSetting = app(\App\Modules\SiteSetting\Repositories\SiteSettingRepository::class)->getOrCreate();
            static::$siteBrandAssets = [
                'logo' => static::formatAssetUrl($siteSetting?->logo_url),
                'icon' => static::formatAssetUrl($siteSetting?->icon_url),
            ];
        } catch (\Throwable $e) {
            static::$siteBrandAssets = [
                'logo' => null,
                'icon' => null,
            ];
        }

        return static::$siteBrandAssets;
    }

    protected static function formatAssetUrl(?string $value): ?string
    {
        if (empty($value)) {
            return null;
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }

        $baseUrl = rtrim(config('app.url'), '/');
        $value = ltrim($value, '/');

        return "{$baseUrl}/{$value}";
    }
}

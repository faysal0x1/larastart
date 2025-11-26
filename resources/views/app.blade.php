<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    @php
        // Load SiteSeo and SiteSetting from database with caching (singleton pattern)
        // This is needed for server-side rendering in the blade template
        // The middleware also shares this data with Inertia pages
        $siteSeo = \App\Helpers\SeoHelper::getSiteSeo();
        try {
            $siteSettingModel = app(\App\Modules\SiteSetting\Repositories\SiteSettingRepository::class)->getOrCreate();
        } catch (\Throwable $e) {
            $siteSettingModel = null;
        }

        // The middleware also sets 'meta' in shared props, but for initial page load
        // we need to generate it here in the blade template
        $seo = null;

        // Generate SEO based on current route (primary method for server-side rendering)
        try {
            $request = request();
            $routeName = $request->route()?->getName();
            $path = $request->getPathInfo();

            // Unified slug route - check products, brands, then categories
            if (preg_match('/^\/[a-z0-9-]+$/i', $path) && $routeName === 'web.slug') {
                $slug = ltrim($path, '/');

                // First check product
                $product = \App\Models\Product::where('slug', $slug)->first();
                if ($product) {
                    $seo = \App\Helpers\SeoHelper::getProductSeo($product);
                } else {
                    // Then check brand
                    $brand = \App\Models\Brand::where('slug', $slug)->first();
                    if ($brand) {
                        $seo = \App\Helpers\SeoHelper::getBrandSeo($brand);
                    } else {
                        // Finally check category
                        $category = \App\Models\Category::where('slug', $slug)->first();
                        if ($category) {
                            $seo = \App\Helpers\SeoHelper::getCategorySeo($category);
                        }
                    }
                }

                if (! $seo && $slug) {
                    $staticPage = app(\App\Modules\StaticPage\Repositories\StaticPageRepository::class)->findBySlug($slug);
                    if ($staticPage) {
                        $seo = \App\Helpers\SeoHelper::forStaticPage($staticPage);
                    }
                }
            }

            // Static pages
            if (!$seo) {
                $pageEnum = match ($routeName) {
                    'home' => \App\Enums\PageSeoEnum::HOME,
                    'products.index' => \App\Enums\PageSeoEnum::ALL_PRODUCTS,
                    'category.memory' => \App\Enums\PageSeoEnum::CATEGORY,
                    'products.category',
                    'products.subcategory',
                    'web.slug'
                        => \App\Enums\PageSeoEnum::CATEGORY_PRODUCTS,
                    default => null,
                };

                if (!$pageEnum) {
                    $pageEnum = match ($path) {
                        '/all-products' => \App\Enums\PageSeoEnum::ALL_PRODUCTS,
                        '/category' => \App\Enums\PageSeoEnum::CATEGORY,
                        '/cart', '/shopcart' => \App\Enums\PageSeoEnum::CART,
                        '/checkout' => \App\Enums\PageSeoEnum::CHECKOUT,
                        '/login' => \App\Enums\PageSeoEnum::LOGIN,
                        '/register' => \App\Enums\PageSeoEnum::REGISTER,
                        '/forgot-password', '/password/reset' => \App\Enums\PageSeoEnum::FORGOT_PASSWORD,
                        '/address-book' => \App\Enums\PageSeoEnum::ADDRESS_BOOK,
                        '/account-settings', '/account' => \App\Enums\PageSeoEnum::ACCOUNT_SETTINGS,
                        '/payment-options', '/payment' => \App\Enums\PageSeoEnum::PAYMENT_OPTIONS,
                        default => \App\Enums\PageSeoEnum::HOME,
                    };
                }

                if ($pageEnum) {
                    $seo = \App\Helpers\SeoHelper::getStaticPageSeo($pageEnum);
                }
            }
        } catch (\Exception $e) {
            // Fallback on error
            $seo = \App\Helpers\SeoHelper::getStaticPageSeo(\App\Enums\PageSeoEnum::HOME);
        }

        // Ensure we have an array
        $seo = $seo ?? [];

        // Default SEO values - use SiteSeo / SiteSetting database values as fallbacks
        $title = $seo['title'] ?? ($siteSeo?->meta_title ?? config('app.name', 'TBZ'));
        $description =
            $seo['description'] ??
            ($siteSeo?->meta_description ??
                'TBZ - The Best Zone offers the best online shopping experience in Bangladesh.');
        $keywords = $seo['keywords'] ?? ($siteSeo?->meta_keyword ?? 'online shopping, Bangladesh, TBZ');
        $metaAuthor = $siteSeo?->meta_author ?? ($siteSeo?->author ?? null);
        $robots = $seo['robots'] ?? ($siteSeo?->meta_robots ?? 'index, follow');
        $canonical = $seo['canonical'] ?? ($siteSeo?->canonical_url ?? url()->current());

        // Open Graph Tags - use SiteSeo database values as fallbacks
        $ogTitle = $seo['og_title'] ?? ($siteSeo?->og_title ?? $title);
        $ogDescription = $seo['og_description'] ?? ($siteSeo?->og_description ?? $description);
        $ogType = $seo['og_type'] ?? ($siteSeo?->og_type ?? 'website');
        $ogUrl = $seo['og_url'] ?? ($siteSeo?->og_url ?? url()->current());
        $siteLogoAsset = $siteSettingModel?->logo_url;
        $siteIconAsset = $siteSettingModel?->icon_url;
        $siteSeoOgImage = $siteSeo?->og_image_url ?? $siteSeo?->og_image;
        $siteSeoTwitterImage = $siteSeo?->twitter_image_url ?? $siteSeo?->twitter_image;
        $ogImage = $seo['og_image'] ?? ($siteSeoOgImage ?? ($siteLogoAsset ?? asset('logo.svg')));
        $twitterImageFromSeo = $siteSeoTwitterImage ?? ($siteSeoOgImage ?? $ogImage);
        $ogImageAlt = $seo['og_image_alt'] ?? ($siteSeo?->og_image_alt ?? $title);
        $ogSiteName = $seo['og_site_name'] ?? ($siteSeo?->og_site_name ?? config('app.name', 'TBZ'));
        $ogLocale = $siteSeo?->og_locale ?? 'en_US';

        // Twitter Card Tags - use SiteSeo database values as fallbacks
        $twitterCard = $seo['twitter_card'] ?? ($siteSeo?->twitter_card ?? 'summary_large_image');
        $twitterTitle = $seo['twitter_title'] ?? ($siteSeo?->twitter_title ?? $title);
        $twitterDescription = $seo['twitter_description'] ?? ($siteSeo?->twitter_description ?? $description);
        $twitterImage = $seo['twitter_image'] ?? $twitterImageFromSeo;
        $twitterSite = $siteSeo?->twitter_site ?? null;
        $twitterCreator = $siteSeo?->twitter_creator ?? null;

        // Additional Meta
        $author = $siteSeo?->author ?? null;
        $copyright = $siteSeo?->copyright ?? null;
        $language = $siteSeo?->language ?? str_replace('_', '-', app()->getLocale());
        $themeColor = $siteSeo?->theme_color ?? null;

        // Favicon and Icons
        $favicon = $siteIconAsset ?? ($siteSeo?->favicon_url ?? ($siteSeo?->favicon ?? $siteLogoAsset));
        $appleTouchIcon = $siteSeo?->apple_touch_icon_url ?? ($siteSeo?->apple_touch_icon ?? $siteLogoAsset);
        $manifestIcon =
            $siteSeo?->manifest_icon_url ?? ($siteSeo?->manifest_icon ?? ($siteIconAsset ?? $siteLogoAsset));

        // Structured Data / Schema Markup
        $schemaMarkup = $siteSeo?->schema_markup ?? null;
    @endphp

    {{-- Basic Meta Tags --}}
    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    <meta name="keywords" content="{{ $keywords }}">
    <meta name="robots" content="{{ $robots }}">
    <link rel="canonical" href="{{ $canonical }}">
    @if ($metaAuthor)
        <meta name="author" content="{{ $metaAuthor }}">
    @endif
    @if ($author)
        <meta name="author" content="{{ $author }}">
    @endif
    @if ($copyright)
        <meta name="copyright" content="{{ $copyright }}">
    @endif
    @if ($language)
        <meta http-equiv="content-language" content="{{ $language }}">
    @endif
    @if ($themeColor)
        <meta name="theme-color" content="{{ $themeColor }}">
    @endif

    {{-- Favicon and Icons --}}
    @if ($favicon)
        <link rel="icon" type="image/x-icon" href="{{ $favicon }}">
    @endif
    @if ($appleTouchIcon)
        <link rel="apple-touch-icon" href="{{ $appleTouchIcon }}">
    @endif
    @if ($manifestIcon)
        <link rel="icon" type="image/png" sizes="192x192" href="{{ $manifestIcon }}">
    @endif

    {{-- Open Graph Tags --}}
    <meta property="og:title" content="{{ $ogTitle }}">
    <meta property="og:description" content="{{ $ogDescription }}">
    <meta property="og:type" content="{{ $ogType }}">
    <meta property="og:url" content="{{ $ogUrl }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:alt" content="{{ $ogImageAlt }}">
    <meta property="og:site_name" content="{{ $ogSiteName }}">
    <meta property="og:locale" content="{{ $ogLocale }}">

    {{-- Twitter Card Tags --}}
    <meta name="twitter:card" content="{{ $twitterCard }}">
    <meta name="twitter:title" content="{{ $twitterTitle }}">
    <meta name="twitter:description" content="{{ $twitterDescription }}">
    @if ($twitterImage)
        <meta name="twitter:image" content="{{ $twitterImage }}">
    @endif
    @if ($twitterSite)
        <meta name="twitter:site" content="{{ $twitterSite }}">
    @endif
    @if ($twitterCreator)
        <meta name="twitter:creator" content="{{ $twitterCreator }}">
    @endif

    {{-- Product-specific meta tags --}}
    @if (isset($seo['product_price']))
        <meta property="product:price:amount" content="{{ $seo['product_price'] }}">
        <meta property="product:price:currency" content="{{ $seo['product_currency'] ?? 'BDT' }}">
        <meta property="product:availability" content="{{ $seo['product_availability'] ?? 'in stock' }}">
    @endif

    {{-- Structured Data / Schema Markup --}}
    @if ($schemaMarkup)
        <script type="application/ld+json">
            {!! $schemaMarkup !!}
        </script>
    @endif

    {{-- Marketing Services Tracking Scripts are injected via InjectTrackingScripts middleware --}}

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=open-sans:300,400,500,600,700,800&display=swap" rel="stylesheet" />

    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body class="font-sans antialiased">


    @inertia
</body>

</html>

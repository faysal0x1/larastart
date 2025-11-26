<?php

declare (strict_types = 1);

namespace App\Enums;

use App\Modules\Cache\Services\SmartCacheService;

enum PageSeoEnum: string {
    case HOME              = 'home';
    case ALL_PRODUCTS      = 'all_products';
    case CATEGORY          = 'category';
    case CART              = 'cart';
    case CHECKOUT          = 'checkout';
    case LOGIN             = 'login';
    case REGISTER          = 'register';
    case FORGOT_PASSWORD   = 'forgot_password';
    case ADDRESS_BOOK      = 'address_book';
    case ACCOUNT_SETTINGS  = 'account_settings';
    case PAYMENT_OPTIONS   = 'payment_options';
    case PRODUCT_DETAILS   = 'product_details';
    case BRAND_PRODUCTS    = 'brand_products';
    case CATEGORY_PRODUCTS = 'category_products';

    /**
     * Get SiteSeo data from cache
     */
    protected static function getSiteSeo(): ?object
    {
        static $siteSeo = null;

        if ($siteSeo === null) {
            try {
                $siteSeo = SmartCacheService::remember('static', 'site_seo', function () {
                    $siteSeoRepository = app(\App\Modules\SiteSeo\Repositories\SiteSeoRepository::class);
                    return $siteSeoRepository->getOrCreate();
                });
            } catch (\Exception $e) {
                $siteSeo = false; // Cache failure to avoid repeated attempts
            }
        }

        return $siteSeo ?: null;
    }

    public function getMetaTitle(): string
    {
        $siteSeo = self::getSiteSeo();
        $defaultTitle = match ($this) {
            self::HOME              => 'TBZ - The Best Zone | Online Shopping in Bangladesh',
            self::ALL_PRODUCTS      => 'All Products - Shop Best Deals Online | TBZ',
            self::CATEGORY          => 'Browse Categories - Shop by Category | TBZ',
            self::CART              => 'Shopping Cart - Review Your Items | TBZ',
            self::CHECKOUT          => 'Checkout - Complete Your Purchase | TBZ',
            self::LOGIN             => 'Login to Your Account | TBZ',
            self::REGISTER          => 'Create Account - Sign Up | TBZ',
            self::FORGOT_PASSWORD   => 'Forgot Password - Reset Your Password | TBZ',
            self::ADDRESS_BOOK      => 'Address Book - Manage Your Addresses | TBZ',
            self::ACCOUNT_SETTINGS  => 'Account Settings - Manage Your Profile | TBZ',
            self::PAYMENT_OPTIONS   => 'Payment Options - Manage Payment Methods | TBZ',
            self::PRODUCT_DETAILS   => 'Product Details | TBZ',
            self::BRAND_PRODUCTS    => 'Brand Products | TBZ',
            self::CATEGORY_PRODUCTS => 'Category Products | TBZ',
        };

        // Use SiteSeo meta_title as fallback if available, otherwise use default
        return $siteSeo?->meta_title ?? $defaultTitle;
    }

    public function getMetaDescription(): string
    {
        $siteSeo = self::getSiteSeo();
        $defaultDescription = match ($this) {
            self::HOME              => 'TBZ - The Best Zone offers the best online shopping experience in Bangladesh. Shop for electronics, fashion, home appliances, and more with great deals and fast delivery.',
            self::ALL_PRODUCTS      => 'Browse our complete catalog of products. Find the best deals on electronics, fashion, home appliances, and more. Shop online at TBZ with fast delivery across Bangladesh.',
            self::CATEGORY          => 'Browse products by category. Find exactly what you\'re looking for with our organized category listings. Shop smart at TBZ.',
            self::CART              => 'Review the items in your shopping cart. Add or remove products before checkout. Shop securely at TBZ.',
            self::CHECKOUT          => 'Complete your purchase securely. Fast and easy checkout process. Shop with confidence at TBZ.',
            self::LOGIN             => 'Login to your TBZ account to access exclusive deals, track orders, and manage your shopping experience.',
            self::REGISTER          => 'Create a free account with TBZ to enjoy exclusive deals, faster checkout, order tracking, and personalized shopping recommendations.',
            self::FORGOT_PASSWORD   => 'Reset your TBZ account password. Follow simple steps to regain access to your account.',
            self::ADDRESS_BOOK      => 'Manage your shipping and billing addresses. Add, edit, or remove addresses for faster checkout.',
            self::ACCOUNT_SETTINGS  => 'Manage your account settings, update personal information, change password, and customize your TBZ account preferences.',
            self::PAYMENT_OPTIONS   => 'Manage your payment methods. Add credit cards, debit cards, or other payment options for faster checkout.',
            self::PRODUCT_DETAILS   => 'View detailed product information, specifications, reviews, and pricing. Make informed purchase decisions at TBZ.',
            self::BRAND_PRODUCTS    => 'Browse products from your favorite brands. Find authentic products with warranty and excellent customer service.',
            self::CATEGORY_PRODUCTS => 'Browse products in this category. Find the best deals and latest products in your favorite categories.',
        };

        // Use SiteSeo meta_description as fallback if available, otherwise use default
        return $siteSeo?->meta_description ?? $defaultDescription;
    }

    public function getMetaKeywords(): string
    {
        $siteSeo = self::getSiteSeo();
        $defaultKeywords = match ($this) {
            self::HOME              => 'online shopping, Bangladesh, TBZ, The Best Zone, electronics, fashion, home appliances, deals, discounts',
            self::ALL_PRODUCTS      => 'products, online shopping, deals, discounts, Bangladesh, TBZ',
            self::CATEGORY          => 'categories, shopping, browse, products, TBZ',
            self::CART              => 'shopping cart, cart, checkout, TBZ',
            self::CHECKOUT          => 'checkout, payment, purchase, order, TBZ',
            self::LOGIN             => 'login, sign in, account, TBZ',
            self::REGISTER          => 'register, sign up, create account, TBZ',
            self::FORGOT_PASSWORD   => 'password reset, forgot password, account recovery, TBZ',
            self::ADDRESS_BOOK      => 'address book, shipping address, billing address, TBZ',
            self::ACCOUNT_SETTINGS  => 'account settings, profile, preferences, TBZ',
            self::PAYMENT_OPTIONS   => 'payment methods, payment options, credit card, debit card, TBZ',
            self::PRODUCT_DETAILS   => 'product details, specifications, reviews, pricing, TBZ',
            self::BRAND_PRODUCTS    => 'brand products, authentic products, warranty, TBZ',
            self::CATEGORY_PRODUCTS => 'category products, deals, latest products, TBZ',
        };

        // Use SiteSeo meta_keyword as fallback if available, otherwise use default
        return $siteSeo?->meta_keyword ?? $defaultKeywords;
    }

    public function getOgType(): string
    {
        $siteSeo = self::getSiteSeo();
        $defaultType = match ($this) {
            self::PRODUCT_DETAILS => 'product',
            default               => 'website',
        };

        // Use SiteSeo og_type as fallback if available, otherwise use default
        return $siteSeo?->og_type ?? $defaultType;
    }

    /**
     * Get robots meta tag value
     */
    public function getRobots(): string
    {
        $siteSeo = self::getSiteSeo();
        return $siteSeo?->meta_robots ?? 'index, follow';
    }

    /**
     * Get canonical URL (uses current URL if not set in SiteSeo)
     */
    public function getCanonicalUrl(): ?string
    {
        $siteSeo = self::getSiteSeo();
        return $siteSeo?->canonical_url ?? null;
    }
}

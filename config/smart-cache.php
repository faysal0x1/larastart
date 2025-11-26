<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Smart Cache Configuration
    |--------------------------------------------------------------------------
    |
    | Control whether the SmartCacheService is enabled or disabled.
    | When disabled, all caching is bypassed and callbacks are executed directly.
    |
    */

    'enabled' => env('SMART_CACHE_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Cache Mode
    |--------------------------------------------------------------------------
    |
    | Control caching behavior:
    | - 'full': All cache types are enabled
    | - 'partial': Only specific cache types are enabled (see below)
    | - 'off': No caching at all
    |
    */

    'cache_mode' => env('SMART_CACHE_MODE', 'full'), // 'full', 'partial', 'off'

    /*
    |--------------------------------------------------------------------------
    | Cache Type Controls (Partial Mode)
    |--------------------------------------------------------------------------
    |
    | When cache_mode is 'partial', these settings control which types are cached.
    | When cache_mode is 'full', all types are cached regardless of these settings.
    | When cache_mode is 'off', no types are cached regardless of these settings.
    |
    */

    'cache_types' => [
        'home' => env('SMART_CACHE_HOME', true),
        'products' => env('SMART_CACHE_PRODUCTS', true),
        'categories' => env('SMART_CACHE_CATEGORIES', true),
        'brands' => env('SMART_CACHE_BRANDS', true),
        'deals' => env('SMART_CACHE_DEALS', true),
        'users' => env('SMART_CACHE_USERS', true),
        'orders' => env('SMART_CACHE_ORDERS', true),
        'cart' => env('SMART_CACHE_CART', true),
        'search' => env('SMART_CACHE_SEARCH', true),
        'static' => env('SMART_CACHE_STATIC', true),
    ],

    /*
    |--------------------------------------------------------------------------
    | Cache Bypass Patterns
    |--------------------------------------------------------------------------
    |
    | Cache keys matching these patterns will be bypassed even if caching is enabled.
    | Useful for excluding specific cache entries.
    |
    */

    'bypass_patterns' => [
        // Example: 'products:test_*',
    ],
];

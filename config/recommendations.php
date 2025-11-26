<?php

return [
    // Preferred cache store for recommendations. Set RECS_CACHE_STORE=file on cPanel if Redis is unavailable.
    'cache_store'         => env('RECS_CACHE_STORE', 'redis'),
    'default_algorithm'   => 'most_viewed_v1',
    'defaults_by_context' => [
        'home'         => 'most_viewed_v1',
        'product_page' => 'upsell_v1',
        'cart'         => 'fbt_v1',
        'email'        => 'previously_viewed_v1',
        'checkout'     => 'cross_sell_v1',
    ],
    'enabled'             => [
        'most_viewed_v1',
        'upsell_v1',
        'cross_sell_v1',
        'previously_viewed_v1',
        'fbt_v1',
        'most_purchased_v1',
    ],
    'cache_ttl'           => [
        'user_specific' => 300,
        'popularity'    => 3600,
    ],
    'weights'             => [
        'upsell_v1'            => 1.0,
        'cross_sell_v1'        => 1.0,
        'most_viewed_v1'       => 1.0,
        'previously_viewed_v1' => 1.0,
        'fbt_v1'               => 1.0,
        'most_purchased_v1'    => 1.0,
    ],

    // Telemetry job behavior. On cPanel without queue workers, set RECS_USE_QUEUE=false.
    'telemetry'           => [
        'use_queue' => (bool) env('RECS_USE_QUEUE', true),
    ],
];

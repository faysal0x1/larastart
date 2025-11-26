<?php

return [
    'sandbox'                  => env("SSLCOMMERZ_SANDBOX", true), // For Sandbox, use "true", For Live, use "false"
    'middleware'               => 'web',                           // you can change this middleware according to you
    'store_id'                 => env("SSLCOMMERZ_STORE_ID"),
    'store_password'           => env("SSLCOMMERZ_STORE_PASSWORD"),
    // Use API webhook endpoints to avoid clashes with other web routes
    'success_url'              => '/api/payment/success',
    'failed_url'               => '/api/payment/failed',
    'cancel_url'               => '/api/payment/cancelled',
    'ipn_url'                  => '/api/payment/ipn',
    'return_response'          => 'json', // html or json - html means blade return, json means json data return
                                          // After gateway callback, where to redirect the customer in the browser
    'redirect_after_success'   => env('SSLCOMMERZ_REDIRECT_SUCCESS', '/payment/thank-you'),
    'redirect_after_failed'    => env('SSLCOMMERZ_REDIRECT_FAILED', '/payment/failed'),
    'redirect_after_cancelled' => env('SSLCOMMERZ_REDIRECT_CANCELLED', '/payment/cancelled'),
];
<?php

// Build path relative to config directory
$moduleConfigPath = dirname(__DIR__) . '/app/Modules/ServiceWorker/Config/service-worker.php';

if (file_exists($moduleConfigPath)) {
    return require $moduleConfigPath;
}

// Default configuration if module doesn't exist
return [
    'enabled'        => env('SERVICE_WORKER_ENABLED', false),
    'cache'          => env('SERVICE_WORKER_CACHE', 'off'),
    'cache_images'   => env('SERVICE_WORKER_CACHE_IMAGES', true),
    'cache_api'      => env('SERVICE_WORKER_CACHE_API', false),
    'max_cache_size' => env('SERVICE_WORKER_MAX_CACHE_SIZE', 100),
    'cache_version'  => env('SERVICE_WORKER_CACHE_VERSION', '1'),
];
<?php

// Build path relative to config directory
$moduleConfigPath = dirname(__DIR__) . '/Modules/ServiceWorker/Config/frontend-cache.php';

if (file_exists($moduleConfigPath)) {
    return require $moduleConfigPath;
}

// Default configuration if module doesn't exist
return [
    'enabled'     => env('FRONTEND_CATEGORY_CACHE_ENABLED', false),
    'ttl_minutes' => env('FRONTEND_CATEGORY_CACHE_TTL', 5),
];

<?php

/**
 * Create necessary directories for Laravel to function properly.
 * This script is called during composer install/update.
 */

$directories = [
    'bootstrap/cache',
    'storage/framework/views',
    'storage/framework/cache/data',
    'storage/framework/sessions',
    'storage/framework/testing',
    'storage/app/public',
    'storage/app/private',
    'storage/logs',
];

foreach ($directories as $directory) {
    if (! is_dir($directory)) {
        mkdir($directory, 0755, true);
    }
}

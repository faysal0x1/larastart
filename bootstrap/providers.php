<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\AuthServiceProvider::class,
    App\Providers\RepositoryServiceProvider::class,
    App\Providers\ImageDownloaderServiceProvider::class,
    App\Providers\SitemapServiceProvider::class,
    // Module providers are now auto-loaded by nwidart/laravel-modules from module.json files
];
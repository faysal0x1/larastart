<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\ImageDownloadService;

class ImageDownloaderServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton('image-downloader', function () {
            return new ImageDownloadService();
        });
    }

    public function boot()
    {
        //
    }
}

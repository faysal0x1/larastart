<?php
namespace App\Providers;

use App\Services\ImageDownloadService;
use Illuminate\Support\ServiceProvider;

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
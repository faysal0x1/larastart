<?php
namespace App\Providers;

use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\ServiceProvider;

class SitemapServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        if ($this->app->runningInConsole()) {
            Schedule::command('sitemap:generate')
                ->daily()
                ->at('02:00')
                ->withoutOverlapping()
                ->runInBackground();
        }
    }
}

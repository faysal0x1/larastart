<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;

class PerformanceServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Optimize Blade compilation
        if ($this->app->environment('production')) {
            Blade::withoutDoubleEncoding();
        }

        // Share common data to all views
        View::composer('*', function ($view) {
            $view->with('appName', config('app.name'));
            $view->with('appUrl', config('app.url'));
        });

        // Optimize database queries
        if ($this->app->environment('production')) {
            \DB::connection()->enableQueryLog();
        }
    }
} 
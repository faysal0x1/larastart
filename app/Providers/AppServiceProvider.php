<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register and boot all enabled modules (if ModuleManager exists)
        $moduleManagerClass = 'App\\Modules\\ModuleManager';
        if (class_exists($moduleManagerClass)) {
            $moduleManagerClass::registerAll();
            $moduleManagerClass::bootAll();
        }
    }
}
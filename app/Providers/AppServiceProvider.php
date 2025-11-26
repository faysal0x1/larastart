<?php
namespace App\Providers;

use App\Modules\ModuleManager;
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
        // Register and boot all enabled modules
        ModuleManager::registerAll();
        ModuleManager::bootAll();
    }
}
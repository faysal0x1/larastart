<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    protected $repositories = [
        'Country',
        'Tag',
        'Blog',
        'BlogCategory',
        'FaqType',
        'Faq',
    ];

    public function register(): void
    {
        // Register existing repositories
        foreach ($this->repositories as $name) {
            $this->app->bind(
                "App\\Repositories\\Interfaces\\{$name}RepositoryInterface",
                "App\\Repositories\\{$name}Repository"
            );
        }

    }
}
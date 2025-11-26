<?php

// app/Providers/RepositoryServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    protected array $repositories = [
        'Country',
        'Tag',
        // 'Blog', // Moved to Blog module
        // 'BlogCategory', // Moved to Blog module
        'FaqType',
        'Faq',
        'Subject',
    ];

    public function register(): void
    {
        foreach ($this->repositories as $name) {
            $this->app->bind(
                "App\\Repositories\\Interfaces\\{$name}RepositoryInterface",
                "App\\Repositories\\{$name}Repository"
            );
        }
    }

    public function boot(): void
    {
        //
    }
}

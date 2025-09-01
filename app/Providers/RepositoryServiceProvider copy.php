<?php
namespace App\Providers;

use App\Repositories\EmployerProfileRepository;
use App\Repositories\FreelancerProfileRepository;
use App\Repositories\Interfaces\ProfileRepositoryInterface;
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

        // Register profile repositories
        $this->app->bind(ProfileRepositoryInterface::class, function ($app) {
            // You can add logic here to determine which repository to use based on user role
            // For now, we'll use the employer profile repository as default
            return $app->make(EmployerProfileRepository::class);
        });

        $this->app->bind(EmployerProfileRepository::class);
        $this->app->bind(FreelancerProfileRepository::class);
    }
}
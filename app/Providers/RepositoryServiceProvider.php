<?php
// app/Providers/RepositoryServiceProvider.php

namespace App\Providers;

use App\Repositories\BlogCategoryRepository;
use App\Repositories\BlogRepository;
use App\Repositories\CountryRepository;
use App\Repositories\Interfaces\BlogCategoryRepositoryInterface;
use App\Repositories\Interfaces\BlogRepositoryInterface;
use App\Repositories\Interfaces\CountryRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
	public function register(): void {
		$this->app->bind(CountryRepositoryInterface::class, CountryRepository::class);
		$this->app->bind(BlogRepositoryInterface::class, BlogRepository::class);
		$this->app->bind(BlogCategoryRepositoryInterface::class, BlogCategoryRepository::class);





	}


	public function boot(): void {
		//
	}
}
<?php

namespace App\Providers;

use App\Models\Conversation;
use App\Policies\ConversationPolicy;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{

	protected $policies = [
		Conversation::class => ConversationPolicy::class,
	];
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
        //
    }
}

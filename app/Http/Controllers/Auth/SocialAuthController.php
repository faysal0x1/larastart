<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
	/**
	 * Redirect to provider for authentication
	 */
	public function redirectToProvider($provider) {
		if (!config('social-login.enabled') || !config("social-login.providers.{$provider}.enabled")) {
			return redirect()->route('login')->with('error', 'This social login option is disabled.');
		}

		return Socialite::driver($provider)->redirect();
	}

	/**
	 * Handle callback from provider
	 */
	public function handleProviderCallback($provider) {
		if (!config('social-login.enabled') || !config("social-login.providers.{$provider}.enabled")) {
			return redirect()->route('login')->with('error', 'This social login option is disabled.');
		}

		try {
			$socialUser = Socialite::driver($provider)->user();

			// Find existing user or create new one
			$user = User::where('email', $socialUser->getEmail())->first();

			if (!$user) {
				// Create new user
				$user = User::create([
					'name' => $socialUser->getName(),
					'email' => $socialUser->getEmail(),
					'password' => Hash::make(uniqid()), // Random password
					'email_verified_at' => now(), // Mark as verified
				]);
			}

			// Log the user in
			Auth::login($user, true);

			return redirect()->intended(route('dashboard'));

		} catch (Exception $e) {
			return redirect()->route('login')->with('error', 'An error occurred during social login.');
		}
	}
}
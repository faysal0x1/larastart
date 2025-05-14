<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\UserLoginHistory;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
	/**
	 * Show the login page.
	 */
	public function create(Request $request): Response
	{
		return Inertia::render('auth/login', [
			'canResetPassword' => Route::has('password.request'),
			'status' => $request->session()->get('status'),
			'socialLoginConfig' => config('social-login.enabled') ? [
				'enabled' => config('social-login.enabled'),
				'providers' => [
					'google' => [
						'enabled' => config('social-login.providers.google.enabled'),
					],
					'facebook' => [
						'enabled' => config('social-login.providers.facebook.enabled'),
					],
					'github' => [
						'enabled' => config('social-login.providers.github.enabled'),
					],
				],
			] : null,
		]);
	}

	/**
	 * Handle an incoming authentication request.
	 */
	/**
	 * Handle an incoming authentication request with security enhancements.
	 */
	public function store(LoginRequest $request): RedirectResponse
	{
		// Begin transaction to ensure all related operations complete successfully
		DB::beginTransaction();

		try {
			// First check if user is already logged in elsewhere
			$user = DB::table('users')
				->where('email', $request->email)
				->first();

			$request->authenticate();
			// Regenerate session for security
			$request->session()->regenerate();

			DB::commit();



			return redirect()->intended(route('dashboard', absolute: false));
		} catch (\Exception $e) {
			DB::rollBack();

			// Record failed login attempt
			if (isset($user) && $user) {
				UserLoginHistory::create([
					'user_id' => $user->id,
					'ip_address' => get_client_ip(),
					'user_agent' => get_client_browser(),
					'event_type' => 'login_failed',
					'error_message' => $e->getMessage(),
					'additional_data' => json_encode(get_client_full_details()),
					'created_at' => Carbon::now(),
				]);
			}

			throw $e;
		}
	}

	/**
	 * Get location information from IP address
	 */
	private function getLocationFromIp(string $ip): ?string
	{
		try {
			// For demonstration - you should implement this with a proper IP geolocation service
			// For example: GeoIP2, ipinfo.io, ip-api.com, etc.
			return json_encode([
				'ip' => $ip,
				'country' => 'Unknown',
				'city' => 'Unknown'
			], JSON_THROW_ON_ERROR);
		} catch (\Exception $e) {
			return null;
		}
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): RedirectResponse
	{
		//		Auth::guard('web')->logout();
		//
		//		$request->session()->invalidate();
		//		$request->session()->regenerateToken();
		//
		//		return redirect('/');

		// Get current user
		$user = Auth::user();

		if ($user) {
			// Record logout in history
			UserLoginHistory::create([
				'user_id' => $user->id,
				'ip_address' => get_client_ip(),
				'user_agent' => get_client_browser(),
				'session_id' => Session::getId(),
				'event_type' => 'logout',
				'additional_data' => json_encode(get_client_full_details()),
				'created_at' => Carbon::now(),
			]);
		}

		Auth::guard('web')->logout();
		Session::invalidate();
		Session::regenerateToken();

		return redirect('/');
	}
}

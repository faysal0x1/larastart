<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\UserLoginHistory;
use App\Models\UserSession;
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
	public function create(Request $request): Response {
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
	public function store(LoginRequest $request): RedirectResponse {
		// Begin transaction to ensure all related operations complete successfully
		DB::beginTransaction();

		try {
			// First check if user is already logged in elsewhere
			$user = DB::table('users')
				->where('email', $request->email)
				->first();

			if ($user) {
				$activeSessions = UserSession::where('user_id', $user->id)
					->where('is_active', true)
					->where('expiry_time', '>', Carbon::now())
					->get();

				// If active sessions exist and we're enforcing single login
				if ($activeSessions->count() > 0) {
					// Option 1: Force logout other sessions
					UserSession::where('user_id', $user->id)
						->update([
							'is_active' => false,
							'logged_out_at' => Carbon::now(),
							'force_logged_out' => true
						]);

					// Store this event in login history
					UserLoginHistory::create([
						'user_id' => $user->id,
						'ip_address' => get_client_ip(),
						'user_agent' => get_client_browser(),
						'event_type' => 'forced_previous_logout',
						'additional_data' => json_encode(get_client_full_details()),
						'created_at' => Carbon::now(),
					]);

					// Flash warning message for the user
					Session::flash('warning', 'You were logged in on another device or browser. Those sessions have been terminated.');
				}
			}

			// Regular authentication
			$request->authenticate();

			// Regenerate session for security
			$request->session()->regenerate();

			// Get client details using our helper functions
			$clientDetails = get_client_full_details();
			$deviceDetails = [
				'browser' => $clientDetails['browser'],
				'os' => $clientDetails['os'],
				'device_type' => $clientDetails['device_type'],
			];

			// Create session record with token
			$sessionToken = bin2hex(random_bytes(32));
			$currentSession = new UserSession([
				'user_id' => Auth::id(),
				'session_id' => Session::getId(),
				'session_token' => $sessionToken,
				'ip_address' => get_client_ip(),
				'user_agent' => get_client_browser(),
				'device_details' => json_encode($deviceDetails),
				'is_active' => true,
				'login_time' => Carbon::now(),
				'last_activity' => Carbon::now(),
				'expiry_time' => Carbon::now()->addHours(config('session.lifetime', 2)),
			]);
			$currentSession->save();

			// Store the session token in the session for future verification
			Session::put('session_token', $sessionToken);

			// Try to get location data
			$location = $this->getLocationFromIp(get_client_ip());

			// Record login history
			UserLoginHistory::create([
				'user_id' => Auth::id(),
				'ip_address' => get_client_ip(),
				'user_agent' => get_client_browser(),
				'location' => $location,
				'session_id' => Session::getId(),
				'event_type' => 'login_success',
				'additional_data' => json_encode($clientDetails),
				'created_at' => Carbon::now(),
			]);

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
	private function getLocationFromIp(string $ip): ?string {
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
	public function destroy(Request $request): RedirectResponse {
//		Auth::guard('web')->logout();
//
//		$request->session()->invalidate();
//		$request->session()->regenerateToken();
//
//		return redirect('/');

		// Get current user
		$user = Auth::user();

		if ($user) {
			// Mark session as inactive
			UserSession::where('user_id', $user->id)
				->where('session_id', Session::getId())
				->update([
					'is_active' => false,
					'logged_out_at' => Carbon::now()
				]);

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

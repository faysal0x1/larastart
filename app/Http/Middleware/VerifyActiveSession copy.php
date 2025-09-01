<?php

namespace App\Http\Middleware;

use App\Models\UserLoginHistory;
use App\Models\UserSession;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class VerifyActiveSession
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next): mixed {
		// Skip for non-authenticated users
		if (!Auth::check()) {
			return $next($request);
		}

		$user = Auth::user();
		$sessionId = Session::getId();
		$sessionToken = Session::get('session_token');

		// If no session token is found, the user might be trying to use an invalid session
		if (!$sessionToken) {
			// Log suspicious activity
			UserLoginHistory::create([
				'user_id' => $user->id,
				'ip_address' => get_client_ip(),
				'user_agent' => get_client_browser(),
				'event_type' => 'suspicious_activity',
				'error_message' => 'Missing session token',
				'additional_data' => json_encode(get_client_full_details()),
				'created_at' => Carbon::now(),
			]);

			Auth::logout();
			Session::flush();
			return redirect()->route('login')
				->with('error', 'Your session has expired or is invalid. Please log in again.');
		}

		// Find user's current session
		$currentSession = UserSession::where('user_id', $user->id)
			->where('session_token', $sessionToken)
			->first();

		// If session not found or is inactive
		if (!$currentSession || !$currentSession->is_active) {
			// Log suspicious activity
			UserLoginHistory::create([
				'user_id' => $user->id,
				'ip_address' => get_client_ip(),
				'user_agent' => get_client_browser(),
				'event_type' => 'suspicious_activity',
				'error_message' => 'Invalid or inactive session',
				'additional_data' => json_encode([
					'client_details' => get_client_full_details(),
					'session_found' => $currentSession ? true : false,
					'session_active' => $currentSession ? $currentSession->is_active : false,
				]),
				'created_at' => Carbon::now(),
			]);

			Auth::logout();
			Session::flush();
			return redirect()->route('login')
				->with('error', 'Your session has been terminated. Another login was detected.');
		}

		// Check if session expired
		if (Carbon::now()->isAfter($currentSession->expiry_time)) {
			$currentSession->update([
				'is_active' => false,
				'logged_out_at' => Carbon::now()
			]);

			// Log session expiry
			UserLoginHistory::create([
				'user_id' => $user->id,
				'ip_address' => get_client_ip(),
				'user_agent' => get_client_browser(),
				'event_type' => 'session_expired',
				'additional_data' => json_encode(get_client_full_details()),
				'created_at' => Carbon::now(),
			]);

			Auth::logout();
			Session::flush();
			return redirect()->route('login')
				->with('error', 'Your session has expired. Please log in again.');
		}

		// Check if client details have changed dramatically (potential session hijacking)
		$originalIp = $currentSession->ip_address;
		$currentIp = get_client_ip();
		$originalUserAgent = $currentSession->user_agent;
		$currentUserAgent = get_client_browser();

		// If both IP and user agent have changed, this could be suspicious
		if ($originalIp != $currentIp && $originalUserAgent != $currentUserAgent) {
			// Log suspicious activity
			UserLoginHistory::create([
				'user_id' => $user->id,
				'ip_address' => get_client_ip(),
				'user_agent' => get_client_browser(),
				'event_type' => 'suspicious_activity',
				'error_message' => 'Client details changed',
				'additional_data' => json_encode([
					'original_ip' => $originalIp,
					'current_ip' => $currentIp,
					'original_user_agent' => $originalUserAgent,
					'current_user_agent' => $currentUserAgent,
					'client_details' => get_client_full_details(),
				]),
				'created_at' => Carbon::now(),
			]);
		}
		// Update last activity time
		$currentSession->update([
			'last_activity' => Carbon::now()
		]);

		return $next($request);
	}
}

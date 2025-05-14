<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
	/**
	 * Show the password reset page.
	 */
	public function create(Request $request): Response {
		return Inertia::render('auth/reset-password', [
			'email' => $request->email,
			'token' => $request->route('token'),
		]);
	}


	public function verifyOtp(Request $request) {
		$request->validate([
			'email' => 'required|email',
			'otp' => 'required|string|size:6'
		]);

		$user = User::where('email', $request->email)
			->where('otp', $request->otp)
			->where('otp_expires_at', '>', now())
			->first();

		if (!$user) {
			return back()->withErrors(['otp' => 'Invalid or expired OTP']);
		}

		return back()->with('status', 'OTP verified successfully!');

	}

	public function store(Request $request) {
		$request->validate([
			'email' => 'required|email',
			'otp' => 'required|string|size:6',
			'password' => 'required|string|confirmed|min:8',
		]);

		$user = User::where('email', $request->email)
			->where('otp', $request->otp)
			->where('otp_expires_at', '>', now())
			->first();

		if (!$user) {
			return response()->json([
				'errors' => ['otp' => 'Invalid or expired OTP']
			], 422);
		}

		// Update password and clear OTP
		$user->update([
			'password' => Hash::make($request->password),
			'otp' => null,
			'otp_expires_at' => null
		]);
		return back()->with('status', 'Password reset successfully!');
	}
}

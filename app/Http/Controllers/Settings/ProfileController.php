<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Laravel\Facades\Image;

class ProfileController extends Controller
{
	/**
	 * Show the user's profile settings page.
	 */
	public function edit(Request $request): Response {
		return Inertia::render('settings/profile', [
			'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
			'status' => $request->session()->get('status'),
		]);
	}

	/**
	 * Update the user's profile settings.
	 */
	/**
	 * Update the user's profile settings.
	 */
	public function update(Request $request): RedirectResponse
	{
		\Log::debug('Update request data:', [
			'name' => $request->name,
			'email' => $request->email,
			'phone' => $request->phone,
			'has_file' => $request->hasFile('photo'),
			'file_valid' => $request->hasFile('photo') ? $request->file('photo')->isValid() : false,
		]);
		// Validate the request data
		$validated = $request->validate([
			'name' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($request->user()->id)],
			'phone' => ['nullable', 'string', 'max:20'],
			'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // Max 2MB
		]);

		$user = $request->user();

		// Update basic info
		$user->name = $validated['name'];
		$user->email = $validated['email'];
		$user->phone = $validated['phone'] ?? null;

		// Reset email verification if email changed
		if ($user->isDirty('email')) {
			$user->email_verified_at = null;
		}

		// Handle photo upload if it exists
		if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
			try {
				if (!is_writable(storage_path('app/public'))) {
					\Log::error('Storage directory is not writable');
					throw new \RuntimeException('Storage directory is not writable');
				}
				// Delete old photo if exists
				if ($user->profile_photo_path) {
					Storage::delete('public/' . $user->profile_photo_path);
				}

				// Process and compress the image
				$image = Image::make($request->file('photo'));

				// Resize and maintain aspect ratio (800px max width)
				$image->resize(800, null, function ($constraint) {
					$constraint->aspectRatio();
					$constraint->upsize();
				});

				// Create a unique filename
				$filename = time() . '_' . Str::random(10) . '.' . $request->file('photo')->getClientOriginalExtension();
				$path = 'profile-photos/' . $filename;

				// Make sure the directory exists
				Storage::makeDirectory('public/profile-photos');

				// Store the compressed image
				Storage::put('public/' . $path, (string) $image->encode(null, 80));

				$user->profile_photo_path = $path;
			} catch (\Exception $e) {
				// Log the error and continue without updating the photo
				Log::error('Profile photo upload failed: ' . $e->getMessage());
				// Optionally set a flash message to inform the user
				return to_route('profile.edit')->with('status', 'profile-updated')->with('error', 'Profile photo could not be uploaded. Please try again.');
			}
		}

		// Save user changes
		$user->save();

		// Debug info
		Log::info('Profile updated', [
			'user_id' => $user->id,
			'name' => $user->name,
			'email' => $user->email,
			'phone' => $user->phone,
			'photo_updated' => $request->hasFile('photo'),
		]);

		return to_route('profile.edit')->with('status', 'profile-updated');
	}


	/**
	 * Delete the user's account.
	 */
	public function destroy(Request $request): RedirectResponse {
		$request->validate([
			'password' => ['required', 'current_password'],
		]);

		$user = $request->user();

		Auth::logout();

		$user->delete();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		return redirect('/');
	}
}

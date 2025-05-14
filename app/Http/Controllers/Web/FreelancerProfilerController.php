<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FreelancerProfilerController extends Controller
{
	public function profile() {
		$user = Auth::user()->load(['freelancer', 'location', 'professionalDetail']);
		return Inertia::render('frontend/freelancer/profile', [
			'user' => $user,
		]);
	}


	public function update(Request $request) {
		$user = Auth::user();

		// Validate user data
		$validatedUserData = $request->validate([
			'name' => 'required|string|max:255',
			'username' => 'required|string|max:255|unique:users,username,' . $user->id,
		]);

		// Validate profile data
		$validatedProfileData = $request->validate([
			'location' => 'nullable|string|max:255',
			'languages' => 'nullable|string|max:255',
			'title' => 'nullable|string|max:255',
		]);

		// Update user data
		$user->update($validatedUserData);

		// Update or create profile data
//		if ($user->profile) {
//			$user->profile->update($validatedProfileData);
//		} else {
//			$user->profile()->create($validatedProfileData);
//		}

		return redirect()->back()->with('success', 'Profile updated successfully');
	}

	public function updateProfileImage(Request $request) {
		$request->validate([
			'profile_image' => 'required|image|max:2048',
		]);

		$user = Auth::user();

		if ($request->hasFile('profile_image')) {
			// Delete old image if exists
			if ($user->photo != null && Storage::disk('public')->exists($user->photo)) {
				if (Storage::disk('public')->exists($user->photo)) {
					Storage::disk('public')->delete($user->photo);
				}
			}

			// Store new image
			$path = $request->file('profile_image')->store('profile-images', 'public');

			$user->photo = $path;
			$user->save();
			return redirect()->back()->with('success', 'Profile image updated successfully');
		}

		return redirect()->back()->with('error', 'Failed to upload image');
	}
}

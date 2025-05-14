<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\MicroTask;
use App\Models\MicroTaskCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WebController extends Controller
{
	public function postJobPage() {
		$countries = Country::whereStatus(1)->get();
		$microTaskCategories = MicroTaskCategory::whereStatus(1)->get();
		return Inertia::render('frontend/custom/JobPostingForm', [
			'countries' => $countries,
			'microTaskCategories' => $microTaskCategories
		]);
	}

	public function postJob(Request $request) {
		Log::info($request->all());


		try {
			DB::beginTransaction();

			// Create micro task
			$microTask = MicroTask::create([
				'title' => $request->jobTitle,
				'employer_id' => auth()->id(),
				'category_id' => $request->jobCategory,
				'country_id' => $request->country,
				'task_type' => 'other',
				'description' => $request->jobDescription,
				'external_link' => $request->externalLink,
//				'mediaLinks' => json_encode($request->mediaLinks),
				'budget' => $request->budget,
				'deadline' => $request->deadline,
				'completion_instructions' => $request->completionInstructions,
				'proofRequirements' => $request->proofRequirements,
				'points_per_completion' => $request->points,
				'max_completions' => $request->maxCompletions,
				'status' => 'pending',
				'requires_admin_approval' => true,
				'expires_at' => $request->deadline,
			]);

			// Handle file uploads
			$filePaths = [];
			if ($request->hasFile('files')) {
				foreach ($request->file('files') as $file) {
					$path = $file->store('microtask/files/' . $microTask->id, 'public');
					$filePaths[] = $path;
				}
				$microTask->update(['files' => json_encode($filePaths)]);
			}

			// Handle thumbnail uploads
			$thumbnailPaths = [];
			if ($request->hasFile('thumbnails')) {
				foreach ($request->file('thumbnails') as $thumbnail) {
					$path = $thumbnail->store('microtask/thumbnails/' . $microTask->id, 'public');
					$thumbnailPaths[] = $path;
				}
				$microTask->update(['thumbnails' => $thumbnailPaths]);
			}
			DB::commit();

			return response()->json([
				'success' => true,
				'task' => $microTask,
				'files' => $filePaths ?? [],
				'thumbnails' => $thumbnailPaths ?? []
			]);

		} catch (\Throwable $th) {
			DB::rollBack();
			Log::error('MicroTask creation failed:', ['error' => $th->getMessage()]);

			return response()->json([
				'success' => false,
				'message' => $th->getMessage()
			], 500);
		}
	}
}

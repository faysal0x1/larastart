<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AdminController extends Controller
{
	/**
	 * Map of model names to their fully qualified class names
	 */
	protected $modelMap = [
		'user' => User::class,
		'country' => Country::class
	];

	protected array $validationRules = [
		'users' => [
			'is_banned' => 'boolean',
			'status' => 'integer|in:0,1',
		],
		'employees' => [
			'is_active' => 'boolean',
			'status' => 'integer|in:0,1',
		],
		'products' => [
			'is_active' => 'boolean',
			'is_featured' => 'boolean',
			'status' => 'integer|in:0,1,2,3',
		],
	];

	/**
	 * Get the model class from the model parameter
	 *
	 * @param string $modelName
	 * @return string|null
	 */
	protected function getModelClass($modelName): ?string {
		return $this->modelMap[$modelName] ?? null;
	}

	/**
	 * Find a model instance by its ID
	 *
	 * @param string $modelClass
	 * @param int    $id
	 * @return Model|null
	 */
	protected function findModel($modelClass, $id): ?Model {
		return $modelClass::find($id);
	}

	/**
	 * Get validation rules for a specific model and fields
	 *
	 * @param string $modelName
	 * @param array  $fields
	 * @return array
	 */
	protected function getValidationRules(string $modelName, array $fields): array {
		$modelRules = $this->validationRules[$modelName] ?? [];

		// Only include rules for fields that are present in the request
		return array_intersect_key($modelRules, array_flip($fields));
	}

	public function updateStatus(Request $request, string $model, $id): ?\Illuminate\Http\RedirectResponse {
		// Get the model class
		$modelClass = $this->getModelClass($model);
		if (!$modelClass) {
			return error_response("Invalid model type: $model", 400);
		}

		// Find the model instance
		$instance = $this->findModel($modelClass, $id);
		if (!$instance) {
			return error_response("$model with ID $id not found", 404);
		}

		// Check permission
		if (method_exists($instance, 'userCanUpdate') && !$instance->userCanUpdate(auth()->user())) {
			return error_response("You don't have permission to update this $model", 403);
		}

		// For standard Laravel authorization
		if (method_exists($this, 'authorize')) {
			try {
				$this->authorize('update', $instance);
			} catch (\Exception $e) {
				return error_response($e->getMessage(), 403);
			}
		}

		// Extract only the fields we're going to update
		$fields = array_keys($request->all());
		$validatedData = $request->all(); // Default to all data

		// Validate the fields if rules exist
		$rules = $this->getValidationRules($model, $fields);

		if (!empty($rules)) {
			$validator = Validator::make($request->all(), $rules);

			if ($validator->fails()) {
				return error_response($validator->errors()->first());
			}

			// Use validated data for fields with rules
			$validatedData = $validator->validated();
		}

		try {
			// Update the model with validated data
			$instance->update($validatedData);

			// Generate a user-friendly message
			$fieldNames = collect($fields)->map(function ($field) {
				return Str::title(str_replace('_', ' ', $field));
			})->join(', ');

			$modelName = Str::singular(Str::title($model));
			$message = "$modelName updated successfully";

			$message = $modelName . " updated successfully";

			return success_response($message);
		} catch (\Exception $e) {
			return error_response("Failed to update $model: " . $e->getMessage());
		}
	}


}
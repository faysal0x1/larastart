<?php
// app/Http/Requests/BlogCategoryStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogCategoryStoreRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array {
		return [
			'name' => 'required|string|max:255',
			'description' => 'required|string|max:255',
			'order' => 'required|integer'
		];
	}

	public function messages(): array {
		return [
			'name.required' => 'Name is required',
			'description.required' => 'Description is required',
			'order.required' => 'Order is required',
		];
	}
}
<?php

// app/Http/Requests/CategoryStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryStoreRequest extends FormRequest
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
            'slug' => 'nullable|string|max:255|unique:categories,slug',
            'description' => 'nullable|string',
            'bottom_description' => 'nullable|string',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'banner' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'parent_id' => 'nullable|integer|exists:categories,id',
            'status' => 'nullable|boolean',
        ];
    }
}

<?php

// app/Http/Requests/SubCategoryStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubCategoryStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_ids'     => 'required|array|min:1',
            'category_ids.*'   => 'integer|exists:categories,id',
            'name'             => 'required|string|max:255',
            'slug'             => 'nullable|string|max:255|unique:sub_categories,slug',
            'priority'         => 'nullable|integer|min:0',
            'description'      => 'nullable|string',
            'image'            => 'nullable|string|max:255',
            'banner'           => 'nullable|string|max:255',
            'meta_title'       => 'nullable|string|max:255',
            'meta_image'       => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'is_featured'      => 'nullable|boolean',
            'is_active'        => 'nullable|boolean',
        ];
    }
}

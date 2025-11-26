<?php

// app/Http/Requests/SubCategoryUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubCategoryUpdateRequest extends FormRequest
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
        $subcategoryId = $this->route('sub_category') ?? $this->route('id');

        return [
            'category_ids'     => 'sometimes|array|min:1',
            'category_ids.*'   => 'integer|exists:categories,id',
            'name'             => 'sometimes|string|max:255',
            'slug'             => 'sometimes|string|max:255|unique:sub_categories,slug,' . $subcategoryId,
            'priority'         => 'sometimes|integer|min:0',
            'description'      => 'sometimes|string',
            'image'            => 'sometimes|string|max:255',
            'banner'           => 'sometimes|string|max:255',
            'meta_title'       => 'sometimes|string|max:255',
            'meta_image'       => 'sometimes|string|max:255',
            'meta_description' => 'sometimes|string|max:500',
            'is_featured'      => 'sometimes|boolean',
            'is_active'        => 'sometimes|boolean',
        ];
    }
}
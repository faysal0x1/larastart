<?php

// app/Http/Requests/CategoryUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
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
            'name'             => 'sometimes|string|max:255',
            'slug'             => 'nullable|string|max:255',
            'description'      => 'nullable|string',
            'image'            => 'nullable|string|max:500',
            'banner'           => 'nullable|string|max:500',
            'meta_title'       => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_image'       => 'nullable|string|max:500',
            'parent_id'        => 'nullable|integer|exists:categories,id',
            'status'           => 'nullable|boolean',
        ];
    }
}

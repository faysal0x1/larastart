<?php
// app/Http/Requests/BlogUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogUpdateRequest extends FormRequest
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
            'blog_category_id' => 'sometimes|integer|exists:blog_categories,id',
            'created_by' => 'sometimes|integer',
            'title' => 'sometimes|string',
            'slug' => 'sometimes|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'summary' => 'sometimes|string',
            'content' => 'sometimes|string',
            'views' => 'sometimes|string',
            'is_featured' => 'sometimes|string',
            'published_at' => 'sometimes|date_format:Y-m-d H:i:s',
            'status' => 'sometimes|string',
            'meta_title' => 'sometimes|string',
            'meta_description' => 'sometimes|string',
            'meta_keywords' => 'sometimes|string',
            'og_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }
}
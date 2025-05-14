<?php
// app/Http/Requests/BlogStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogStoreRequest extends FormRequest
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
            'blog_category_id' => 'required|integer|exists:blog_categories,id',
            'created_by' => 'required|integer',
            'title' => 'required|string',
            'slug' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'summary' => 'required|string',
            'content' => 'required|string',
            'views' => 'required|string',
            'is_featured' => 'required|string',
            'published_at' => 'required|date_format:Y-m-d H:i:s',
            'status' => 'required|string',
            'meta_title' => 'required|string',
            'meta_description' => 'required|string',
            'meta_keywords' => 'required|string',
            'og_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }
}
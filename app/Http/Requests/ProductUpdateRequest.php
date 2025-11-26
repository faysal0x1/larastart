<?php

// app/Http/Requests/ProductUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
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
            'brand_id' => 'sometimes|integer|exists:brands,id',
            'category_id' => 'sometimes|integer|exists:categories,id',
            'subcategory_id' => 'sometimes|integer|exists:categories,id',
            'child_category_id' => 'sometimes|integer|exists:categories,id',
            'name' => 'sometimes|string',
            'slug' => 'sometimes|string',
            'type' => 'sometimes|string',
            'sku' => 'sometimes|string',
            'qty' => 'sometimes|integer|min:0',
            'tags' => 'sometimes|array',
            'tags.*' => 'string',
            'size' => 'sometimes|array',
            'size.*' => 'string',
            'stock' => 'sometimes|string',
            'unit_price' => 'sometimes|numeric|min:0',
            'discount_type' => 'sometimes|string|in:flat,percent',
            'discount_price' => 'sometimes|numeric|min:0',
            'product_tax' => 'sometimes|numeric|min:0',
            'tax_calculation' => 'sometimes|boolean',
            'final_price' => 'sometimes|numeric',
            'short_descp' => 'sometimes|string',
            'long_descp' => 'sometimes|string',
            'key_features' => 'sometimes|string',
            'product_thumbnail' => 'sometimes|file|image|max:2048',
            'hot_deals' => 'sometimes|boolean',
            'featured' => 'sometimes|boolean',
            'special_offer' => 'sometimes|boolean',
            'special_deals' => 'sometimes|boolean',
            'status' => 'sometimes|string|in:active,inactive',
            'variations' => 'sometimes|array',
            'variations.*.name' => 'required_with:variations|string',
            'variations.*.sku' => 'required_with:variations|string',
            'variations.*.price' => 'required_with:variations|numeric|min:0',
            'variations.*.stock' => 'required_with:variations|integer|min:0',
            'variations.*.attributes' => 'required_with:variations|array',
            'color_images' => 'sometimes|array',
            'color_images.*.file' => 'required_with:color_images|file|image|max:2048',
            'color_images.*.colorCode' => 'required_with:color_images|string',
            'images' => 'sometimes|array',
            'images.*' => 'file|image|max:2048',
            'specs' => 'sometimes|array',
            'specs.*' => 'array',
            'meta_title' => 'sometimes|string|max:255',
            'meta_description' => 'sometimes|string|max:500',
        ];
    }
}
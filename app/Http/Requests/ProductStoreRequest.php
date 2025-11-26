<?php

// app/Http/Requests/ProductStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
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
            'brand_id' => 'required|integer|exists:brands,id',
            'category_id' => 'required|integer|exists:categories,id',
            'subcategory_id' => 'required|integer|exists:subcategories,id',
            'name' => 'required|string',
            'slug' => 'required|string',
            'type' => 'required|string',
            'sku' => 'required|string',
            'qty' => 'required|string',
            'tags' => 'required|string',
            'size' => 'required|string',
            'stock' => 'required|string',
            'unit_price' => 'required|string',
            'discount_type' => 'required|string',
            'discount_price' => 'required|string',
            'product_tax' => 'required|string',
            'tax_calculation' => 'required|string',
            'final_price' => 'required|numeric',
            'short_descp' => 'required|string',
            'long_descp' => 'required|string',
            'product_thumbnail' => 'required|string',
            'hot_deals' => 'required|string',
            'featured' => 'required|string',
            'special_offer' => 'required|string',
            'special_deals' => 'required|string',
            'status' => 'required|string|in:active,inactive',
        ];
    }
}

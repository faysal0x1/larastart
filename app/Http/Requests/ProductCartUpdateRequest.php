<?php

// app/Http/Requests/ProductCartUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCartUpdateRequest extends FormRequest
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
            'user_id' => 'sometimes|integer|exists:users,id',
            'product_id' => 'sometimes|integer|exists:products,id',
            'qty' => 'sometimes|string',
            'price' => 'sometimes|string',
            'color' => 'sometimes|string',
            'size' => 'sometimes|string',
            'variation' => 'sometimes|string',
            'cartTotal' => 'sometimes|string',
        ];
    }
}

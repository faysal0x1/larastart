<?php

// app/Http/Requests/DealOfTheDayUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DealOfTheDayUpdateRequest extends FormRequest
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
            'title' => 'sometimes|string',
            'slug' => 'sometimes|string',
            'product_id' => 'sometimes|integer|exists:products,id',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'discount_type' => 'sometimes|string',
            'discount' => 'sometimes|numeric',
            'status' => 'sometimes|string|in:active,inactive',
        ];
    }
}

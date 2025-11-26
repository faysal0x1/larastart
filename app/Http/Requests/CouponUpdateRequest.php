<?php

// app/Http/Requests/CouponUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponUpdateRequest extends FormRequest
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
            'type' => 'sometimes|string',
            'title' => 'sometimes|string',
            'slug' => 'sometimes|string',
            'code' => 'sometimes|string',
            'coupon_for' => 'sometimes|integer',
            'limit' => 'sometimes|string',
            'user_limit' => 'sometimes|string',
            'coupon_used' => 'sometimes|string',
            'discount_type' => 'sometimes|string',
            'discount' => 'sometimes|string',
            'max_discount' => 'sometimes|string',
            'minimum_purchase' => 'sometimes|string',
            'start_at' => 'sometimes|string',
            'end_at' => 'sometimes|string',
            'status' => 'sometimes|string|in:active,inactive',
        ];
    }
}

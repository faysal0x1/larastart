<?php

declare(strict_types=1);

// app/Http/Requests/CouponStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CouponStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'type' => 'required|string',
            'title' => 'required|string',
            'code' => 'required|string',
            'coupon_for' => 'nullable|integer|exists:users,id',
            'limit' => 'required|string',
            'user_limit' => 'nullable|string',
            'discount_type' => 'required|string',
            'discount' => 'required|string',
            'max_discount' => 'nullable|string',
            'minimum_purchase' => 'nullable|string',
            'start_at' => 'required',
            'end_at' => 'nullable',
        ];
    }

    public function messages() {
        return [
            'type.required' => 'Coupon type is required.',
            'title.required' => 'Coupon title is required.',
            'code.required' => 'Coupon code is required.',
            'coupon_for.required' => 'Coupon for is required.',
            'limit.required' => 'Coupon limit is required.',
            'user_limit.required' => 'Coupon user limit is required.',
            'discount_type.required' => 'Discount type is required.',
            'discount.required' => 'Discount is required.',
            'start_at.required' => 'Start date is required.',
            'end_at.required' => 'End date is required.',
        ];
    }
}

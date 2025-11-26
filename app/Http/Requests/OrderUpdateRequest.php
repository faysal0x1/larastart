<?php

// app/Http/Requests/OrderUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderUpdateRequest extends FormRequest
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
            'division_id' => 'sometimes|integer|exists:divisions,id',
            'district_id' => 'sometimes|integer|exists:districts,id',
            'upazilla_id' => 'sometimes|integer|exists:upazillas,id',
            'name' => 'sometimes|string',
            'email' => 'sometimes|string|email',
            'phone' => 'sometimes|string|regex:/^[0-9+\-\s()]+$/',
            'address' => 'sometimes|string',
            'post_code' => 'sometimes|string',
            'notes' => 'sometimes|string',
            'payment_type' => 'sometimes|string',
            'payment_method' => 'sometimes|string',
            'transaction_id' => 'sometimes|string|exists:transactions,id',
            'discount' => 'sometimes|string',
            'amount' => 'sometimes|numeric',
            'currency' => 'sometimes|string',
            'order_number' => 'sometimes|string',
            'invoice_no' => 'sometimes|string',
            'order_date' => 'sometimes|date',
            'confirmed_date' => 'sometimes|string',
            'processing_date' => 'sometimes|string',
            'picked_date' => 'sometimes|string',
            'shipped_date' => 'sometimes|string',
            'delivered_date' => 'sometimes|string',
            'cancel_date' => 'sometimes|string',
            'out_of_delivery_date' => 'sometimes|string',
            'return_date' => 'sometimes|string',
            'return_reason' => 'sometimes|string',
            'status' => 'sometimes|string|in:active,inactive',
            'payment_status' => 'sometimes|string|in:active,inactive',
            'order_type' => 'sometimes|string',
        ];
    }
}

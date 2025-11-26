<?php

// app/Http/Requests/OrderStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderStoreRequest extends FormRequest
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
            'user_id' => 'required|integer|exists:users,id',
            'division_id' => 'required|integer|exists:divisions,id',
            'district_id' => 'required|integer|exists:districts,id',
            'upazilla_id' => 'required|integer|exists:upazillas,id',
            'name' => 'required|string',
            'email' => 'required|string|email',
            'phone' => 'required|string|regex:/^[0-9+\-\s()]+$/',
            'address' => 'required|string',
            'post_code' => 'required|string',
            'notes' => 'required|string',
            'payment_type' => 'required|string',
            'payment_method' => 'required|string',
            'transaction_id' => 'required|string|exists:transactions,id',
            'discount' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string',
            'order_number' => 'required|string',
            'invoice_no' => 'required|string',
            'order_date' => 'required|date',
            'confirmed_date' => 'required|string',
            'processing_date' => 'required|string',
            'picked_date' => 'required|string',
            'shipped_date' => 'required|string',
            'delivered_date' => 'required|string',
            'cancel_date' => 'required|string',
            'out_of_delivery_date' => 'required|string',
            'return_date' => 'required|string',
            'return_reason' => 'required|string',
            'status' => 'required|string|in:active,inactive',
            'payment_status' => 'required|string|in:active,inactive',
            'order_type' => 'required|string',
        ];
    }
}

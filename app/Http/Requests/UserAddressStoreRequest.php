<?php

// app/Http/Requests/UserAddressStoreRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAddressStoreRequest extends FormRequest
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
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'post_code' => 'required|integer',
            'division_id' => 'required|integer|exists:divisions,id',
            'district_id' => 'required|integer|exists:districts,id',
            'upazilla_id' => 'required|integer|exists:upazillas,id',
            'address' => 'required|string',
        ];
    }
}

<?php

// app/Http/Requests/UserAddressUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAddressUpdateRequest extends FormRequest
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
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'post_code' => 'sometimes|integer',
            'division_id' => 'sometimes|integer|exists:divisions,id',
            'district_id' => 'sometimes|integer|exists:districts,id',
            'upazilla_id' => 'sometimes|integer|exists:upazillas,id',
            'address' => 'sometimes|string',
        ];
    }
}

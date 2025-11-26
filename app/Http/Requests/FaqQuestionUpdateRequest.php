<?php

// app/Http/Requests/FaqQuestionUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FaqQuestionUpdateRequest extends FormRequest
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
            'question' => 'sometimes|string',
            'answer' => 'sometimes|string',
            'status' => 'sometimes|string|in:active,inactive',
            'ranking' => 'sometimes|string',
        ];
    }
}

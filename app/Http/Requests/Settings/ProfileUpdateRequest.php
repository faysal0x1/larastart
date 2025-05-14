<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
			'name' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$this->user()->id],
			'phone' => ['nullable', 'string', 'max:20'],
			'photo' => [
				'nullable',
				'image',
				'mimes:jpeg,png,jpg,gif,webp',
				'max:10240',
			],
		];
	}
}
<?php

namespace App\Http\Requests\ValueGenerator;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegistrationRequest extends FormRequest
{

    protected $stopOnFirstFailure = true;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_name' => 'required|string|unique:value_generators',
            'email' => 'required|string|email|unique:value_generators',
            'password' => 'required|string|min:6',
            'password_confirmation' =>'required|same:password'
        ];
    }
    public function messages()
    {
        return [
            'user_name.required' => 'Please give your username!',
            'password.required' => 'Please give your password!',
            'email.required' => 'Please give your email!',
            'email.email' => 'Give a valid email address!',
            'email.unique' => 'Email has been used!',
            'username.unique' => 'Username has been used!',
            'password_confirmation.required' => "Password didn't match!",
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}

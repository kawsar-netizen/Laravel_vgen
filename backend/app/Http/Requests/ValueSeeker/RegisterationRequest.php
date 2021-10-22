<?php

namespace App\Http\Requests\ValueSeeker;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterationRequest extends FormRequest
{
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
            'user_name' => 'required|string',
            'email'     => 'required|string|unique:value_seekers',
            'password'  => 'required|min:8',
            'confirm_password' => 'required|same:password'
        ];
    }
    public function message(){
        return [
            'user_name.required' => 'Please Give Your Username!',
            'email.required'     => 'Please Give Your Email!',
            'password.required'  => 'Please Give Your Password!',
            'email.email'        => 'Give a Valid Email Address!',
            'email.unique'       => 'Email has been Used!',
            'confirm_password.required' => "Password didn't match!"
    ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}

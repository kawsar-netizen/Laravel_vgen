<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class MobileBankRequest extends FormRequest
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
            'wallet_name'=>'required|string',
            'wallet_number'=>'required|numeric',
            'wallet_type'=>'required',
            'wallet_logo'=>'required'

        ];
    }
    public function messages()
    {
        return [
            'wallet_name.required'=> 'Wallet name field is required',
            'wallet_number.required'=> 'Wallet number field is required',
            'wallet_type.required'=> 'Wallet type field is required',
            'wallet_logo.required'=> 'Wallet logo field is required',

        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(),422));
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AddBankRequest extends FormRequest
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
            'bank_name'=>'required|string',
            'bank_account_no'=>'required|numeric',
            'bank_logo'=>'required',

        ];
    }
    public function messages()
    {
        return [
            'bank_name.required'=> 'Bank Name field is required',
            'bank_account_no.required'=> 'Bank Account Number field is required',
            'bank_logo.required'=> 'Bank Logo field is required',

        ];
    }
    protected function failedValidation(Validator $validator)
    {
       throw new HttpResponseException(response()->json($validator->errors(),422));
    }
}

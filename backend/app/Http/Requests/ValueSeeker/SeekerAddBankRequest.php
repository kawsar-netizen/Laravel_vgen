<?php

namespace App\Http\Requests\ValueSeeker;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class SeekerAddBankRequest extends FormRequest
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
            'bank_name'=>'required|string|unique:bank_details',
            'account_no'=>'required|numeric',
            'account_holder_name'=>'required|string',
            'branch_name'=>'required|string',

        ];
    }
    public function messages()
    {
        return [
            'bank_name.required'=> 'Bank name field is required',
            'account_no.required'=> 'Account number field is required',
            'account_holder_name.required'=> 'Account holder is required',

        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(),422));
    }
}
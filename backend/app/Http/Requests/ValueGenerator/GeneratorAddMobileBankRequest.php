<?php

namespace App\Http\Requests\ValueGenerator;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class GeneratorAddMobileBankRequest extends FormRequest
{
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
            'mobile_bank_type'=>'required|string|unique:mobile_bank_details',
            'account_no'=>'required|numeric',

        ];
    }
    public function messages()
    {
        return [
            'mobile_bank_type.required'=> 'This field is required',
            'account_no.required'=> 'Account number field is required',

        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(),422));
    }
}

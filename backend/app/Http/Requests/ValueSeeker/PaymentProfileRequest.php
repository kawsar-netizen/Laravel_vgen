<?php

namespace App\Http\Requests\ValueSeeker;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PaymentProfileRequest extends FormRequest
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
            'bank_status' => 'boolean',
            'mobile_banking_status' => 'boolean',
            'bank_name' => 'exclude_if:bank_status,false|required',
            'account_no' => 'exclude_if:bank_status,false|required',
            'account_holder_name' => 'exclude_if:bank_status,false|required',
            'branch_name' => 'exclude_if:bank_status,false|required',
            'mobile_bank_type' => 'exclude_if:mobile_banking_status,false|required',
            'mobile_account_no' => 'exclude_if:mobile_banking_status,false|required',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
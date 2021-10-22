<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EducationRequest extends FormRequest
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
            'institute_type'=>'required|string',
            'country'=>'required|string',
            'major'=>'required|string',
            'compilition_year'=>'required',

        ];
    }
    public function messages()
    {
        return [
            'institute_type.required'=> 'Institute name field is required',
            'country.required'=> 'Country field is required',
            'major.required'=> 'Major subject field is required',
            'compilition_year.required'=> 'Year field is required',

        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(),422));
    }
}

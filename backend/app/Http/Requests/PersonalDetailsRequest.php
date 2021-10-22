<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PersonalDetailsRequest extends FormRequest
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
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'description' => 'required',
            'dob' => 'required',
            'nationality' => 'required',
            'nid_number' => 'required|numeric',
            'nid_front_img' => 'required',
            'nid_back_img' => 'required',
            'face_img' => 'required',
            'country_code' => 'required|numeric',
            'mobile_no' => 'required|numeric',
            'secondary_email' => 'required',

        ];
    }

    public function messages()
    {
        return [
            'first_name' => 'First name field is required',
            'last_name.required' => 'Last name field is required',
            'description.required' =>'Description field is required',
            'dob.required' =>'Birth Date field is required',
            'nationality.required' => 'Nationality field is required',
            'nid_number.required' => 'NId number field is required',
            'nid_front_img.required' => 'NId front side image field is required',
            'nid_back_img.required' => 'NId back side image field is required',
            'face_img.required' => 'Profile image field is required',
            'country_code.required' => 'Country code name field is required',
            'mobile_no.required' => 'Mobile no field is required',
            'secondary_email.required' =>'Secondary email field is required',

        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}

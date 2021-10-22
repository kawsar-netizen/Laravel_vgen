<?php

namespace App\Http\Requests\ValueSeeker;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class JobRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'title' => 'required|max:255',
            'description' => 'required',
            'skills' => 'required',
            'work_from' => 'required',
            'job_type' => 'required',
            'experience_level' => 'required',
            'min_budget' => 'required|numeric|not_in:0',
            'max_budget' => 'required|numeric|not_in:0',
            'duration' => 'nullable',
            'deadline' => 'required|date'
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}

<?php

namespace App\Services;

use App\Models\Education;

class EducationService
{
    public static function  store($json, $id)
    {
        $educations = $json->education;
        foreach ($educations as $education) {
            Education::insert(
                [
                    'institute_type' => $education->institute_type,
                    'country' => $education->country,
                    'major' => $education->major,
                    'compilition_year' => $education->compilition_year,
                    'value_generator_id' => $id
                ]
            );
        }
    }
}

<?php

namespace App\Services;

use App\Models\Certificate;


class CertificateService
{
    public static function  store($json, $id)
    {
        $certificates = $json->certificate;
        foreach ($certificates as $certificate) {
            if (empty($certificate->certification_title)) {
                return response()->json(['Message' => 'Title can not be empty', 202]);
            }
            if (empty($certificate->certified_by)) {
                return response()->json(['Message' => 'Institute can not be empty', 202]);
            }
            if (empty($certificate->year)) {
                return response()->json(['Message' => 'Year can not be empty', 202]);
            }
            Certificate::insert(
                [
                    'certification_title' => $certificate->certification_title,
                    'certified_by' => $certificate->certified_by,
                    'year' => $certificate->year,
                    'value_generator_id' => $id
                ]
            );
        }
    }
}

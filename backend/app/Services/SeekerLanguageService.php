<?php

namespace App\Services;

use App\Models\Language;

class SeekerLanguageService
{
    public static function  store($json, $id)
    {
        $langs = $json->lang;
        foreach ($langs as $lang) {
            Language::insert(
                [
                    'language' => $lang->name,
                    'level' => $lang->level,
                    'value_seeker_id' => $id
                ]
            );
        }
    }
}

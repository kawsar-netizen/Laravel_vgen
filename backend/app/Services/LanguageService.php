<?php

namespace App\Services;

use App\Models\Language;

class LanguageService
{
    public static function  store($json, $id)
    {
        $langs = $json->lang;
        foreach ($langs as $lang) {

            if (empty($lang->name)) {
                return response()->json(['Message' => 'Language name field is required', 202]);
            }
            if (empty($lang->level)) {
                return response()->json(['Message' => 'Language level field is required', 202]);
            }
            $language  = new Language();
            $language -> language = $lang->name;
            $language -> level = $lang->level;
            $language -> value_generator_id =  $id;
            $language -> save();
            return response()->json(['Data' => $language]);

        }
    }
    public static function  update($json,$generatorId, $id)
    {
        $langs = $json->lang;
        foreach ($langs as $lang) {
            if (empty($lang->name)) {
                return response()->json(['Message' => 'Language name field is required', 202]);
            }
            if (empty($lang->level)) {
                return response()->json(['Message' => 'Language level field is required', 202]);
            }
            $language  = Language::find($id);
            $language -> language = $lang->name;
            $language -> level = $lang->level;
            $language -> value_generator_id =  $generatorId;
            $language -> save();
            return response()->json(['Data' => $language]);
        }
    }
}

<?php
namespace App\Services;
use App\Models\Skill;
class SkillService
{
    public static function  store($json, $id)
    {
        $skills = $json->skills;
        foreach ($skills as $skill) {
            if (empty($skill->skill)) {
                $data = array(
                    'success' => false,
                    'message' => 'Skill is Required',
                );
                return response()->json($data, 200);
            }
            Skill::insert(
                [
                    'skill' => $skill->skill,
                    'value_generator_id' => $id
                ]
            );
        }
    }
    public static function  storeJobSkills($json, $id)
    {
        $skills = $json->skills;
        foreach ($skills as $skill) {
            Skill::insert(
                [
                    'skill' => $skill->skill,
                    'job_id' => $id
                ]
            );
        }
    }
}

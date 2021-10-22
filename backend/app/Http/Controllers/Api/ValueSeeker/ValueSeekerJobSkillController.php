<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;

class ValueSeekerJobSkillController extends Controller
{
    public function deleteSkills($id)
    {
       Skill::findOrFail($id)->delete();
       $data = array(
         'message' => 'The skill deleted successfully'
       );
       return response($data, 200);
    }
}

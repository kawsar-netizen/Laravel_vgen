<?php

namespace App\Http\Controllers\Api\ValueGenerator;


use App\Models\Social;
use App\Models\PersonalInfo;
use Illuminate\Http\Request;
use App\Models\ValueGenerator;
use App\Services\SkillService;
use App\Services\LanguageService;
use App\Services\EducationService;
use App\Http\Controllers\Controller;
use App\Services\CertificateService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ValueGeneratorPersonalInfoController extends Controller
{
    public function viewProfile(){
         $id = Auth::guard('vg-api')->user()->id;
        $user = DB::table('value_generators')
            ->where('value_generators.id', $id)
            ->join('personal_infos', 'value_generators.id', '=', 'personal_infos.value_generator_id')
            ->join('languages', 'value_generators.id', '=', 'languages.value_generator_id')
            ->join('socials', 'value_generators.id', '=', 'socials.value_generator_id')
            ->join('education', 'value_generators.id', '=', 'education.value_generator_id')
            ->join('certificates', 'value_generators.id', '=', 'certificates.value_generator_id')
            ->join('skills', 'value_generators.id', '=', 'skills.value_generator_id')
            ->select(
                'value_generators.first_name as generatorsFirstName','value_generators.last_name as generatorsLastName','value_generators.email as primaryEmail',
                'personal_infos.dob as dateOfBirth', 'personal_infos.nationality as nationality', 'personal_infos.nid_number as nidNumber',
                'personal_infos.nid_front_img as nidFrontImg', 'personal_infos.nid_back_img as nidBackImg', 'personal_infos.face_img as profileImg', 'personal_infos.country_code as countryCode',
                'personal_infos.mobile_no as mobileNo', 'personal_infos.secondary_email as secondaryEmail', 'personal_infos.description as description',
                'languages.language as languageName','languages.level as languageLevel',
                'socials.type as socialType','socials.link as socialLink',
                'education.institute_type as instituteName','education.country as instituteCountry',
                'education.major as instituteMajor','education.compilition_year as instituteCompilitionYear',
                'certificates.certification_title as certificationTitle','certificates.certified_by as certifiedBy',
                'certificates.year as certifiedYear','skills.skill as skillName',

            )
            ->get();
        return $user;
    }

    public function editProfile(Request $request)
    {
        $id = Auth::guard('vg-api')->user()->id;
        $user = ValueGenerator::find($id);
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->save();

        $value_generator_info = PersonalInfo::where('value_generator_id',  $id)->first();
        $info = PersonalInfo::find($value_generator_info->id);
        $info->description = $request->description;
        $info->dob = $request->dob;
        $info->nationality = $request->nationality;
        $info->nid_number = $request->nid_number;
        $info->country_code = $request->country_code;
        $info->mobile_no = $request->mobile_no;
        $info->secondary_email = $request->secondary_email;

        //NID FRONT IMG
        $info->nid_front_img = $request->file('nid_front_img')->store('images');
        //NID BACK IMG
        $info->nid_back_img = $request->file('nid_back_img')->store('images');
        //FACE IMG
        $info->face_img = $request->file('face_img')->store('images');

        //Language_json
        LanguageService::store(json_decode($request->lang), $id);

        //Social Link Account
        $social = new Social();
        if ($request->type == 'facebook') {
            $social->type = 1;
            $social->link = $request->link;
        } elseif ($request->type == 'linkedin') {
            $social->type = 2;
            $social->link = $request->link;
        } elseif ($request->type == 'twitter') {
            $social->type = 3;
            $social->link = $request->link;
        } elseif ($request->type == 'dribble') {
            $social->type = 4;
            $social->link = $request->link;
        } elseif ($request->type == 'behance') {
            $social->type = 5;
            $social->link = $request->link;
        }
        $social->value_generator_id = $id;
        $social->save();

        //Education_json
        EducationService::store(json_decode($request->education), $id);

        //Certificate_json
        CertificateService::store(json_decode($request->certificate), $id);

        //Skill_json
        SkillService::store(json_decode($request->skills), $id);

        $info->save();

        $data = array(
            'success' => true,
            'message' => 'Update Successfully!',
            'data' => ['info' => $info],
        );
        return response()->json($data, 200);
    }
}

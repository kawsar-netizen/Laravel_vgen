<?php

namespace App\Http\Controllers\Api\ValueSeeker;


use App\Models\ValueSeeker;
use App\Models\PersonalInfo;
use Illuminate\Http\Request;
use App\Services\LanguageService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ValueSeekerPersonalInfoController extends Controller
{
    public function editProfile(Request $request)
    {
        $id = Auth::guard('vs-api')->user()->id;
        LanguageService::store(json_decode($request->lang), $id);
        $user = ValueSeeker::find($id);
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->save();

        $personlinfo = PersonalInfo::where('value_seeker_id', $id)->first();
        $info = PersonalInfo::find($personlinfo->id);

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
        $info->save();
        $data = array(
            'success' => true,
            'message' => 'Update Successfully!',
            'data' => ['info' => $info],
        );
        return response()->json($data, 200);
    }

    public function editOrganizationProfile(Request $request)
    {
        $id = Auth::guard('vs-api')->user()->id;
        LanguageService::store(json_decode($request->lang), $id);
        $personlinfo = PersonalInfo::where('value_seeker_id', $id)->first();
        $info = PersonalInfo::find($personlinfo->id);
        $info->company_name = $request->company_name;
        $info->website = $request->website;
        $info->founding_date = $request->founding_date;
        $info->nationality = $request->nationality;
        $info->nid_number = $request->nid_number;
        $info->country_code = $request->country_code;
        $info->mobile_no = $request->mobile_no;
        $info->tin_number = $request->tin_number;
        $info->secondary_email = $request->secondary_email;

        //NID FRONT IMG
        $info->nid_front_img = $request->file('nid_front_img')->store('images');
        //NID BACK IMG
        $info->nid_back_img = $this->personalImage($request->file('nid_back_img'));
        //FACE IMG
        $info->face_img  = $this->personalImage($request->file('face_img'));

        $info->save();
        $data = array(
            'success' => true,
            'message' => 'Update Successfully!',
            'data' => ['info' => $info],
        );
        return response()->json($data, 200);
    }

    public function getPersonalInfo()
    {
        $personlinfo = PersonalInfo::where('value_seeker_id', Auth::guard('vs-api')->user()->id)->first();
        if ($personlinfo->isEmpty()) {
            $data = array(
                'success' => false,
                'message' => 'No Record Found',
            );
            return response()->json($data, 204);
        }
        $data = array(
            'success' => true,
            'message' => 'Update Successfully!',
            'data' => ['personal_info' => $personlinfo],
        );
        return response()->json($data, 200);
    }
}

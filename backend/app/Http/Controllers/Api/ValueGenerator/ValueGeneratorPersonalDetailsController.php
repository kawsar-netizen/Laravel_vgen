<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PersonalDetailsRequest;
use App\Models\PersonalInfo;
use App\Models\ValueGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ValueGeneratorPersonalDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {

            $id = Auth::guard('vg-api')->user()->id;
            $details = DB::table('value_generators')
                ->where('value_generators.id', $id)
                ->leftJoin('personal_infos', 'value_generators.id', '=', 'personal_infos.value_generator_id')
                ->select
                (
                    'value_generators.id as userId',
                    'value_generators.user_name as userName',
                    'value_generators.first_name as firstName',
                    'value_generators.last_name as lastName',
                    'value_generators.email as primaryEmail',
                    'personal_infos.description',
                    'personal_infos.dob',
                    'personal_infos.nationality',
                    'personal_infos.nid_number',
                    'personal_infos.nid_front_img',
                    'personal_infos.nid_back_img',
                    'personal_infos.face_img',
                    'personal_infos.country_code',
                    'personal_infos.mobile_no',
                    'personal_infos.secondary_email',
                )
                ->first();
            $faceImage = asset('/'. $details-> face_img);
            $nidFrontImage = asset('/'. $details-> nid_front_img);
            //$nidBackImage = public_path('/') . $details-> nid_back_img;
            $nidBackImage = asset('/'.$details-> nid_back_img);
            return response()->json([
                'success' => true,
                'Details' => $details,
                'faceImage' => $faceImage,
                'nidFrontImage' => $nidFrontImage,
                'nidBackImage' => $nidBackImage,

            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    private static function personalDetailsImage($image){
        $ext = strtolower($image->getClientOriginalExtension());
        $image_full_name = time().$ext.rand().'.'. $ext;
        $upload_path = 'images/';
        $image_url = $upload_path . $image_full_name;
        $image->move($upload_path, $image_full_name);
        return $image_url;

    }
    public function store(Request $request)
    {
        try {
            $id = Auth::guard('vg-api')->user()->id;

            $generator = ValueGenerator::find($id);
            $generator->first_name = $request->first_name;
            $generator->last_name = $request->last_name;
            $generator->save();

            $personalInfo = PersonalInfo::where('value_generator_id',$id)->first();
            if (empty($personalInfo->id)) {
                $personalInfo = new PersonalInfo();
                $personalInfo->value_generator_id = $id;
                $personalInfo->save();
            }
            $details = PersonalInfo::find($personalInfo->id);
            $details->description = $request->description;
            $details->dob = Carbon::parse($request->dob)->format('d/m/y');
            $details->nationality = $request->nationality;
            $details->nid_number = $request->nid_number;
            $details->country_code = $request->country_code;
            $details->mobile_no = $request->mobile_no;
            $details->secondary_email = $request->secondary_email;
            //NID FRONT IMG
            if ($request->file('nid_front_img')) {
                @unlink(public_path('/') . $details-> nid_front_img);
                $details->nid_front_img  =  $this::personalDetailsImage($request->file('nid_front_img'));
            }
            //NID BACK IMG
            if ($request->file('nid_back_img')) {
                @unlink(public_path('/') . $details-> nid_back_img);
                $details->nid_back_img  =  $this::personalDetailsImage($request->file('nid_back_img'));
            }
            //FACE IMG
            if ($request->file('face_img')) {
                //$details->face_img = $request->file('face_img')->store('images');
                @unlink(public_path('/') . $details-> face_img);
                $details->face_img  =  $this::personalDetailsImage($request->file('face_img'));
            }
            $details -> save();

            return response()->json([
                'success' => true,
                'Message' => 'Personal Info Details Added Successfully',
                'Details' => $details,

            ], 400);


        }catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        try {

            //$id = Auth::guard('vg-api')->user()->id;
            $details = DB::table('value_generators')
                ->where('value_generators.id', $id)
                ->leftJoin('personal_infos', 'value_generators.id', '=', 'personal_infos.value_generator_id')
                ->select
                (
                    'value_generators.user_name as userName',
                    'value_generators.first_name as firstName',
                    'value_generators.last_name as lastName',
                    'value_generators.email as primaryEmail',
                    'personal_infos.description',
                    'personal_infos.dob',
                    'personal_infos.nationality',
                    'personal_infos.nid_number',
                    'personal_infos.nid_front_img',
                    'personal_infos.nid_back_img',
                    'personal_infos.face_img',
                    'personal_infos.country_code',
                    'personal_infos.mobile_no',
                    'personal_infos.secondary_email',
                )
                ->first();
            return response()->json([
                'success' => true,
                'Details' => $details

            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            //$id = Auth::guard('vg-api')->user()->id;

            $generator = ValueGenerator::find($id);
            $generator->first_name = $request->first_name;
            $generator->last_name = $request->last_name;
            $generator->save();

            $personalInfo = PersonalInfo::where('value_generator_id',$id)->first();
            if (empty($personalInfo->id)) {
                $personalInfo = new PersonalInfo();
                $personalInfo->value_generator_id = $id;
                $personalInfo->save();
            }
            $details = PersonalInfo::find($personalInfo->id);
            $details->description = $request->description;
            $details->dob = Carbon::parse($request->dob)->format('d/m/y');
            $details->nationality = $request->nationality;
            $details->nid_number = $request->nid_number;
            $details->country_code = $request->country_code;
            $details->mobile_no = $request->mobile_no;
            $details->secondary_email = $request->secondary_email;

            //NID FRONT IMG
            if ($request->file('nid_front_img')) {
                @unlink(public_path('/') . $details-> nid_front_img);
                $details->nid_front_img  =  $this::personalDetailsImage($request->file('nid_front_img'));
            }
            //NID BACK IMG
            if ($request->file('nid_back_img')) {
                @unlink(public_path('/') . $details-> nid_back_img);
                $details->nid_back_img  =  $this::personalDetailsImage($request->file('nid_back_img'));
            }
            //FACE IMG
            if ($request->file('face_img')) {
                //$details->face_img = $request->file('face_img')->store('images');
                @unlink(public_path('/') . $details-> face_img);
                $details->face_img  =  $this::personalDetailsImage($request->file('face_img'));
            }

            $details -> save();

            return response()->json([
                'success' => true,
                'Message' => 'Personal Info Details Updated Successfully',
                'Details' => $details,

            ], 200);


        }catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /*

    public function testpersonal(){
        $id = Auth::guard('vg-api')->user()->id;
        $gen = ValueGenerator::find($id);
        $per = PersonalInfo::where('value_generator_id',$id)->first();
        //$per = $gen->personal->nationality;
        //$details = PersonalInfo::where('value_generator_id',$id)->get();
        $info = PersonalInfo::find($per->id);
        foreach ($info->generator as $i){
            $check1 = [
                'username' =>$i->user_name
            ];
            $check[] = $check1;
        }




      return response()->json([
        'data' => $check,
      ],200);


    }*/

}

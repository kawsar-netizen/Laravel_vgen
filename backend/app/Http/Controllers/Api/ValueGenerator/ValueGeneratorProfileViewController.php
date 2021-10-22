<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;

class ValueGeneratorProfileViewController extends Controller
{
    public function getProfile($id)
    {
        $valueGeneratorRepository = resolve('App\Repositories\ValueGeneratorRepository');
        $valueGenerator = $valueGeneratorRepository->getValueGeneratorProfile($id);
        return response()->json($valueGenerator, 200);

        /*
        try {
            //$profile = ValueGenerator::find($id);
            $TotalProject = DB::table('projects')
                ->where([['value_generator_id',$id],['status',2],['payment_status',1]])
                ->count();
            $profile = DB::table('value_generators')
                ->where('value_generators.id',$id)
                ->leftJoin('languages', 'value_generators.id', '=', 'languages.value_generator_id')
                ->leftJoin('personal_infos', 'value_generators.id', '=', 'personal_infos.value_generator_id')
                ->leftJoin('education', 'value_generators.id', '=', 'education.value_generator_id')
                ->leftJoin('certificates', 'value_generators.id', '=', 'certificates.value_generator_id')
                ->select
                (
                    'value_generators.first_name as firstName','value_generators.last_name as lastName',
                    'languages.language as lanName','languages.level as lanLevel',
                    'personal_infos.description as aboutMe','personal_infos.face_img as profilePicture',
                    'education.institute_type as instituteName','education.country as instituteCountry',
                    'certificates.certification_title as certificationTitle','certificates.certified_by as certifiedBy',
                )
                ->get();

            $rating = DB::table('ratings')
                ->where('value_generator_id',$id)
                ->join('value_seekers','ratings.value_seeker_id','=','value_seekers.id')
                ->select('value_seekers.first_name as seekerFirstName','value_seekers.last_name as seekerLastName','value_seekers.img as seekerImg','ratings.comment as comment', 'ratings.rating as rating')
                ->get();

            return response()->json([
                'success'=>true,
                'Profile' => $profile,
                'TotalProject' =>$TotalProject,
                'rating'=>$rating

            ],400);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
        */
     
    }
}

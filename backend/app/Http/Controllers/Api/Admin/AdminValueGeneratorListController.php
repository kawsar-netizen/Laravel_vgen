<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\BankDetail;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\Language;
use App\Models\MobileBankDetail;
use App\Models\PersonalInfo;
use App\Models\Skill;
use App\Models\ValueGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;
//use Barryvdh\DomPDF\PDF;
use PDF;

class AdminValueGeneratorListController extends Controller
{
    public function generatorList()
    {
        try {
            $data = ValueGenerator::select('value_generators.id','value_generators.first_name','value_generators.last_name','value_generators.active_status','value_generators.created_at',
                DB::raw('IFNULL(COUNT(projects.value_generator_id),0) as ongoingProject'),
                DB::raw('IFNULL(AVG(ratings.rating),0) as rating'),
                DB::raw('IFNULL(value_generator_wallets.balance,0) as balance'),
                DB::raw('(CASE
                        WHEN value_generators.active_status = "0" THEN "Not Active"
                        WHEN value_generators.active_status = "1" THEN "Active"
                        ELSE "Ban"
                        END) AS status_lable'),

            )
                ->leftJoin('projects', function ($join) {
                    $join->on('value_generators.id', '=', 'projects.value_generator_id')
                        ->Where(function ($query) {
                            $query->where('projects.status', 0)
                                ->where('projects.payment_status', 0)
                                ->orWhere((function ($query) {
                                    $query->where('projects.status', 1)
                                        ->where('projects.payment_status', 0);
                                }));
                        });
                })
                ->leftJoin('value_generator_wallets','value_generators.id','=','value_generator_wallets.value_generator_id')
                ->leftJoin('ratings', 'value_generators.id', '=', 'ratings.value_generator_id')
                ->groupBy('value_generators.id','value_generators.first_name','value_generators.last_name','value_generators.active_status','value_generators.created_at','balance')
                ->paginate(20);
            /*
            if ($data->active_status == 0) {
                $status = 'Not Active';
            } elseif ($data->active_status == 1) {
                $status = 'Active';
            }
            */
            return response()->json([
                'success' => true,
                'data' => $data,

            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }

    public function generatorStatus($id)
    {
        try {

            $generator = ValueGenerator::findOrFail($id);
            if ($generator->active_status == 1 || $generator->active_status == 0 ) {
                if ($generator->active_status == 1) {
                    $generator->active_status = 0;
                } elseif ($generator->active_status == 0) {
                    $generator->active_status = 1;
                }
                $generator->save();
            }else{
                $message = 'Please active user first';
            }


            if ($generator->active_status == 1) {
                $message = 'Value Generator Active Successfully';
                $status = 'Active';
            } elseif ($generator->active_status == 0) {
                $message = 'Value Generator Not Active Successfully';
                $status = 'Not Active';
            }
            return response()->json([
                'success' => true,
                'Message' => $message,
                'status_lable' => $status

            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function generatorInformation($id)
    {
        try {
            $basicInformation = ValueGenerator::where('id', $id)
                ->select('value_generators.id as generatorId','value_generators.first_name as firstName', 'value_generators.last_name as lastName', 'value_generators.email as emailAddress')
                ->first();
            $personalInformationCheck = PersonalInfo::where('value_generator_id', $id)
                ->select('personal_infos.dob as birthDate', 'personal_infos.nationality as country', 'personal_infos.nid_number as nidNumber', 'personal_infos.mobile_no as mobileNumber', 'nid_front_img as nidFrontImage', 'nid_back_img as nidBackImage', 'personal_infos.face_img as profilePicture')
                ->first();
            $faceImage = asset('/'.(!empty($personalInformationCheck->profilePicture) ? $personalInformationCheck->profilePicture : 'noFaceImage'));
            $nidFrontImg = asset('/'.(!empty($personalInformationCheck->nidFrontImage) ? $personalInformationCheck->nidFrontImage : 'noNidFrontImg'));
            $nidBackImg = asset('/'.(!empty($personalInformationCheck->nidBackImage) ? $personalInformationCheck->nidBackImage : 'noNidBackImg'));
            $personalInformation = array(
                'birthDate' => empty($personalInformationCheck->birthDate) ? '':$personalInformationCheck->birthDate,
                'country' => empty($personalInformationCheck->country) ? '':$personalInformationCheck->country,
                'nidNumber' =>empty($personalInformationCheck->nidNumber) ? '':$personalInformationCheck->nidNumber ,
                'mobileNumber' =>empty($personalInformationCheck->mobileNumber) ? '':$personalInformationCheck->mobileNumber ,
                'faceImage' => $faceImage,
                'nidFrontImg' => $nidFrontImg,
                'nidBackImg' => $nidBackImg,
            );
            $language = Language::where('value_generator_id', $id)
                ->select('languages.language as languageName')
                ->get();
            $education = Education::where('value_generator_id', $id)
                ->select('education.institute_type as instituteName','education.major as major', 'education.country as instituteCountry')
                ->get();
            $certificate = Certificate::where('value_generator_id', $id)
                ->select('certificates.certification_title as certificationTitle')
                ->get();
            $bankPayment = BankDetail::where('value_generator_id', $id)
                ->select('bank_details.bank_name as bankName')
                ->get();
            $mobileBankPayment = MobileBankDetail::where('value_generator_id', $id)
                ->select('mobile_bank_type as mobileBankName')
                ->get();
            $skill = Skill::where('value_generator_id', $id)
                ->select('skill as skillName')
                ->get();
            $address = Address::where('value_generator_id', $id)
                ->select('present_division','present_district','present_post_code','present_village','present_holding_no','present_road_no')
                ->first();


            $data = array(
                'basicInformation' => $basicInformation,
                'personalInformation' => $personalInformation,
                'Language' => $language,
                'Education' => $education,
                'Certificate' => $certificate,
                'BankPayment' => $bankPayment,
                'MobileBankPayment' => $mobileBankPayment,
                'Skill' => $skill,
                'Address' =>$address,
            );

            return response()->json([
                'success' => true,
                'GeneratorAllInformation' => $data

            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function generatorWorkList($id)
    {
        try {
            $WorkHistory = DB::table('projects')
                ->where('projects.value_generator_id', $id)
                ->join('value_seekers', 'projects.value_seeker_id', '=', 'value_seekers.id')
                ->select(
                    'value_seekers.first_name as SeekerFirstName','value_seekers.last_name as SeekerLastName','projects.id as workId',
                            'projects.amount as value',

                    DB::raw('(CASE
                        WHEN projects.status = "0" THEN "Ongoing"
                        WHEN projects.status = "1" THEN "Review"
                        ELSE "Completed"
                        END) AS status'),
                    DB::raw('(CASE
                        WHEN projects.payment_status = "0" THEN "Pending"
                        ELSE "Completed"
                        END) AS paymentStatus'),
                    DB::raw('DATE(projects.created_at) AS StartDate'),
                    DB::raw('(DATEDIFF(projects.deadline,projects.created_at)) AS Duration'),

                )
                ->paginate(20);


            return response()->json([
                'success'=>true,
                'WorkHistory' => $WorkHistory,

            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }
    public function generatorJobDetails($projectId){
        try {
            $WorkDetails = DB::table('projects')
                ->where('projects.id',$projectId)
                ->join('jobs','projects.job_id','=','jobs.id')
                ->select(
                    'jobs.title as jobTitle','jobs.job_type as jobType',
                    'projects.id as workId','projects.job_id as JobId',
                    'projects.created_at as startDate','projects.deadline as endDate','projects.progress as progress',
                    'projects.status as status','projects.payment_status as paymentStatus',
                    DB::raw('(CASE
                        WHEN projects.status = "0" THEN "Ongoing"
                        WHEN projects.status = "1" THEN "Review"
                        ELSE "Completed"
                        END) AS status'),
                    DB::raw('(CASE
                        WHEN projects.payment_status = "0" THEN "Pending"
                        ELSE "Completed"
                        END) AS paymentStatus')
                )
                ->first();

            $workRating =DB::table('ratings')
                ->where('ratings.project_id',$WorkDetails->workId)
                ->select(
                DB::raw('IFNULL((ratings.comment),0) as comment'),
                DB::raw('IFNULL((ratings.rating),0) as rating')
                )
                ->first();


            return response()->json([
                'success'=>true,
                'WorkDetails' => $WorkDetails,
                'WorkRating' => $workRating

            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }
    public function generatorWorkInvoice($projectId){
        try {

            $invoice = DB::table('projects')
                ->where('projects.id',$projectId)
                ->join('value_generators','projects.value_generator_id','=','value_generators.id')
                ->select(
                    'value_generators.first_name as firstName','value_generators.last_name as lastName','value_generators.email as email',
                    'projects.id as workId','projects.job_id as JobId',
                    'projects.created_at as startDate','projects.deadline as endDate','projects.amount as amount',
                    'projects.value_generator_id as generatorId'
                )
                ->first();
            $generator_personal_info = PersonalInfo::where('value_generator_id',$invoice->generatorId)->select('personal_infos.nationality as country')->first();



            $data = [
                'firstName' => $invoice->firstName,
                'lastName' => $invoice->lastName,
                'email'=> $invoice->email,
                'workId'=> $invoice->workId,
                'startDate'=> $invoice->startDate,
                'amount'=> $invoice->amount,
                'JobId'=> $invoice->JobId,
                'country'=>  empty($generator_personal_info->country)?'':$generator_personal_info->country,

            ];

            $pdf = PDF::loadView('valueGeneratorPdf', $data);
            return $pdf->download('test.pdf');
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
}

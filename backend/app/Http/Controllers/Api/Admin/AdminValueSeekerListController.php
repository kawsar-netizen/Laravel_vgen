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
use App\Models\ValueSeeker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDF;

class AdminValueSeekerListController extends Controller
{
    public function seekerList()
    {
        try {
            $data = ValueSeeker::select('value_seekers.id','value_seekers.first_name','value_seekers.last_name','value_seekers.active_status','value_seekers.created_at',
                DB::raw('IFNULL(COUNT(projects.value_seeker_id),0) as ongoingProject'),
                DB::raw('IFNULL(value_seeker_wallets.balance,0) as balance'),
                DB::raw('IFNULL(AVG(ratings.rating),0) as rating'),
                DB::raw('(CASE
                        WHEN value_seekers.active_status = "0" THEN "Not Active"
                        WHEN value_seekers.active_status = "1" THEN "Active"
                        ELSE "Ban"
                        END) AS status_lable'),
            )
                ->leftJoin('projects', function ($join) {
                    $join->on('value_seekers.id', '=', 'projects.value_seeker_id')
                        ->Where(function ($query) {
                            $query->where('projects.status', 0)
                                ->where('projects.payment_status', 0)
                                ->orWhere((function ($query) {
                                    $query->where('projects.status', 1)
                                        ->where('projects.payment_status', 0);
                                }));
                        });
                })
                ->leftJoin('value_seeker_wallets','value_seekers.id','=','value_seeker_wallets.value_seeker_id')
                ->leftJoin('ratings', 'value_seekers.id', '=', 'ratings.value_seeker_id')
                ->groupBy('value_seekers.id','value_seekers.first_name','value_seekers.last_name','value_seekers.active_status','value_seekers.created_at','balance')
                ->paginate(20);
            return response()->json([
                'success' => true,
                'data' => $data

            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function seekerStatus($id)
    {
        try {
            $generator = ValueSeeker::find($id);
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
                $message = 'Value Seeker Active Successfully';
            } elseif ($generator->active_status == 0) {
                $message = 'Value Seeker Not Active Successfully';
            }
            return response()->json([
                'success' => true,
                'Status' => $message

            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function seekerInformation($id)
    {
        try {
            $basicInformation = ValueSeeker::where('id', $id)
                ->select('value_seekers.id as seekerId','value_seekers.first_name as firstName', 'value_seekers.last_name as lastName', 'value_seekers.email as emailAddress')
                ->first();
            $personalInformationCheck = PersonalInfo::where('value_seeker_id', $id)
                ->select('personal_infos.face_img as profilePicture', 'personal_infos.dob as birthDate', 'personal_infos.nationality as country', 'personal_infos.nid_number as nidNumber', 'personal_infos.mobile_no as mobileNumber', 'nid_front_img as nidFrontImage', 'nid_back_img as nidBackImage')
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
            $language = Language::where('value_seeker_id', $id)
                ->select('languages.language as languageName')
                ->get();

            $bankPayment = BankDetail::where('value_seeker_id', $id)
                ->select('bank_details.bank_name as bankName')
                ->get();
            $mobileBankPayment = MobileBankDetail::where('value_seeker_id', $id)
                ->select('mobile_bank_type as mobileBankName')
                ->get();
            $address = Address::where('value_seeker_id', $id)
                ->select('present_division','present_district','present_post_code','present_village','present_holding_no','present_road_no')
                ->first();
            $data = array(
                'basicInformation' => $basicInformation,
                'personalInformation' => $personalInformation,
                'Language' => $language,
                'BankPayment' => $bankPayment,
                'MobileBankPayment' => $mobileBankPayment,
                'Address' =>$address
            );

            return response()->json([
                'success' => true,
                'SeekerAllInformation' => $data

            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function seekerWorkList($id)
    {
        try {
            $WorkHistory = DB::table('projects')
                ->where('projects.value_seeker_id', $id)
                ->join('value_generators', 'projects.value_generator_id', '=', 'value_generators.id')
                ->select(
                    'value_generators.first_name as generatorFirstName','value_generators.last_name as generatorLastName','projects.id as workId',
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
                'WorkHistory' => $WorkHistory

            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }
    public function seekerJobDetails($projectId){
        try {
            $WorkDetails = DB::table('projects')
                ->where('projects.id',$projectId)
                ->join('jobs','projects.job_id','=','jobs.id')
                ->select(
                    'jobs.title as jobTitle','jobs.job_type as jobType',
                    'projects.id as workId','projects.job_id as JobId',
                    'projects.created_at as startDate','projects.deadline as endDate','projects.progress as progress',
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
    public function seekerWorkInvoice($projectId){
        try {

            $invoice = DB::table('projects')
                ->where('projects.id',$projectId)
                ->join('value_seekers','projects.value_seeker_id','=','value_seekers.id')
                ->select(
                    'value_seekers.first_name as firstName','value_seekers.last_name as lastName','value_seekers.email as email',
                    'projects.id as workId','projects.job_id as JobId',
                    'projects.created_at as startDate','projects.deadline as endDate','projects.amount as amount',
                    'projects.value_seeker_id as seekerId'
                )
                ->first();

            $generator_personal_info = PersonalInfo::where('value_seeker_id',$invoice->seekerId)
                ->select('personal_infos.nationality as country')
                ->first();



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

            $pdf = PDF::loadView('valueSeekerPdf', $data);
            return $pdf->download('test.pdf');
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
}

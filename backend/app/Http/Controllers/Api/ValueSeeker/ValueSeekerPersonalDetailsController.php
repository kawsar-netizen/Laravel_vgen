<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PersonalInfo;
use App\Models\ValueSeeker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ValueSeekerPersonalDetailsController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		//
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
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		try {
			$valueSeekerId = Auth::guard('vs-api')->user()->id;
			$valueSeeker = ValueSeeker::find($valueSeekerId);
			$valueSeeker->first_name = $request->first_name;
			$valueSeeker->last_name = $request->last_name;
			$valueSeeker->save();

			$personalInfo = PersonalInfo::where('value_seeker_id',$valueSeekerId)->first();
			if (empty($personalInfo->id)) {
				$personalInfo = new PersonalInfo();
				$personalInfo->value_seeker_id = $valueSeekerId;
				$personalInfo->save();
			}
			$details = PersonalInfo::find($personalInfo->id);
			$details->dob = Carbon::parse($request->dob)->format('Y-m-d');
			$details->nationality = $request->nationality;
			$details->nid_number = $request->nid_number;
			$details->country_code = $request->country_code;
			$details->mobile_no = $request->mobile_no;
			$details->secondary_email = $request->secondary_email;

			//NID FRONT IMG
			if ($request->file('nid_front_img')) {
				@unlink(public_path('/') . $details->nid_front_img);
				$details->nid_front_img  =  $this->personalDetailsImage($request->file('nid_front_img'));
			}
			//NID BACK IMG
			if ($request->file('nid_back_img')) {
				@unlink(public_path('/') . $details->nid_back_img);
				$details->nid_back_img  =  $this->personalDetailsImage($request->file('nid_back_img'));
			}
			//FACE IMG
			if ($request->file('face_img')) {
				//$details->face_img = $request->file('face_img')->store('images');
				@unlink(public_path('/') . $details->face_img);
				$details->face_img  =  $this->personalDetailsImage($request->file('face_img'));
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
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit()
	{
		try {
			$valueSeekerId = Auth::guard('vs-api')->user()->id;
			$details = DB::table('value_seekers')
			->where('value_seekers.id', $valueSeekerId)
			->leftJoin('personal_infos', 'value_seekers.id', '=', 'personal_infos.value_seeker_id')
			->select
			(
				'value_seekers.first_name as firstName',
				'value_seekers.last_name as lastName',
				'personal_infos.dob',
				'personal_infos.nationality',
				'personal_infos.nid_number',
				'personal_infos.nid_front_img',
				'personal_infos.nid_back_img',
				'personal_infos.face_img',
				'personal_infos.country_code',
				'personal_infos.mobile_no',
				'personal_infos.secondary_email',
				'value_seekers.email as primaryEmail',

			)
			->first();
			$details->dob = Carbon::parse($details->dob)->format('j F Y');
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
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function personalDetailsImage($image){
		$ext = strtolower($image->getClientOriginalExtension());
		$image_full_name = time().$ext.rand().'.'. $ext;
		$upload_path = 'images/';
		$image_url = $upload_path . $image_full_name;
		$image->move($upload_path, $image_full_name);
		return $image_url;

	}
	public function update(Request $request, $id)
	{
		
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}
}

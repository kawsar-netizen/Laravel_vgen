<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PendingJobApplicantCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class ValueSeekerPendingSelectionController extends Controller
{
	public function getJobs()
	{
		$valueSeekerId = Auth::guard('vs-api')->user()->id;
		$jobRepository = resolve('App\Repositories\JobRepository');
		$jobs = $jobRepository->getJobs($valueSeekerId);
		$data = array(
			'success' => true,
			'data' => ['jobs' => $jobs],
		);
		return response()->json($data, 200);
	}
	public function getApplicantDetails($id)
	{
		$applyRepository = resolve('App\Repositories\ApplyRepository');
		$ApplicantDetails = $applyRepository->getApplicantDetails($id);
		return new PendingJobApplicantCollection($ApplicantDetails);
	}
	public function getPendingJobDetails($id)
	{
		$jobRepository = resolve('App\Repositories\JobRepository');
		$jobDetails = $jobRepository->getJobForValueSeekerPendingSelection($id);
		$data = array(
			'success' => true,
			'data' => ['jobDetails' => $jobDetails],
		);
		return response()->json($data, 200);
	}
	public function countProjects()
	{
		$valueSeekerId = Auth::guard('vs-api')->user()->id;
		$totalProjects = DB::table('projects')->where('value_seeker_id', $valueSeekerId)
		->selectRaw('count(*) as totalTask')
		->selectRaw("count(case when status = 0 then 1 end) as ongoing")
		->selectRaw("count(case when payment_status = 0 then 1 end) as pendingPayment")
		->first();
		$data = array(
			'success' => true,
			'data' => ['projectsCount' => $totalProjects],
		);
		return response()->json($data, 200);
	}
}

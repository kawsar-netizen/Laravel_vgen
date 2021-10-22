<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ValueGeneratorJobCollection;
use App\Http\Resources\SkillWiseJobCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class ValueGeneratorJobController extends Controller
{
	private $jobRepository;
	public function __construct()
	{
		$this->jobRepository = resolve('App\Repositories\JobRepository');
	}
	public function index($query = false)
	{
		$jobs = $this->jobRepository->getApprovedJobs($query);
		return new ValueGeneratorJobCollection($jobs);
	}
	public function getJobForBid($id)
	{   
		$job = $this->jobRepository->getJobForBid($id);
		$data = array(
			'success' => true,
			'data' => [
				'job' => $job,
			]
		);
		return response()->json($data, 200);
	}
	public function countProjects()
	{   
		$valueGeneratorId = Auth::guard('vg-api')->user()->id;
		$totalProjects = DB::table('projects')->where('value_generator_id', $valueGeneratorId)
		->selectRaw('count(*) as totalTask')
		->selectRaw("count(case when status = 0 then 1 end) as ongoing")
		->selectRaw("count(case when status = 1 then 1 end) as revisionRequested")
		->first();
		$data = array(
			'success' => true,
			'data' => [
				'projectsCount' => $totalProjects,
			]
		);
		return response()->json($data, 200);
	}
	public function getJobWithClient($id)
	{
		$job = $this->jobRepository->getJobWithClient($id);
		$data = array(
			'success' => true,
			'data' => [
				'job' => $job,
			]
		);
		return response()->json($data, 200);

	}
}

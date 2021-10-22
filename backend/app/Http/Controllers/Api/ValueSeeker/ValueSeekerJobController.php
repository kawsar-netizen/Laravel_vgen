<?php
namespace App\Http\Controllers\Api\ValueSeeker;
use App\Models\Job;
use Illuminate\Http\Request;
use App\Services\SkillService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\JobCollection;
use App\Http\Requests\ValueSeeker\JobRequest;
class ValueSeekerJobController extends Controller
{
	protected $jobRepository;
	public function __construct()
	{
		$this->jobRepository = resolve('App\Repositories\JobRepository');
	}
	public function index()
	{
		$jobs = $this->jobRepository->all();
		return new JobCollection($jobs);
		//My Personal Code
		// $this->data['jobs'] = Job::all();
		// return response()->json([$this->data,200]);
	}
	public function create()
	{
		//
	}
	public function store(JobRequest $request)
	{
		$validatedData = $request->validated();
		$validatedData['value_seeker_id'] = Auth::guard('vs-api')->user()->id;
		$skills=$validatedData['skills'];
		$jobModel=$this->jobRepository->store($validatedData);
		SkillService::storeJobSkills(json_decode($skills),$jobModel->id);
		$jobModel['skills']=$jobModel->skills;
		$data = array(
			'success' => true,
			'message' => 'The job saved successfully',
			'data' => ['jobs' => $jobModel],
		);
		return response()->json($data, 200);
	}
	public function show($id)
	{
		$job = $this->jobRepository->findJobWithRelatedSkills($id);
		$data = array(
			'success' => true,
			'data' => ['job' => $job],
		);
		return response()->json($data, 200);
	}
	public function edit($id)
	{
		$job = $this->jobRepository->findJobWithRelatedSkills($id);
		$data = array(
			'success' => true,
			'data' => ['job' => $job],
		);
		return response()->json($data, 200);
	}
	public function update(JobRequest $request, $id)
	{
		$validatedData = $request->validated();
		$skills=$validatedData['skills'];
		$jobModel = $this->jobRepository->update($validatedData, $id);
		SkillService::storeJobSkills(json_decode($skills),$jobModel->id);
        $jobModel['skills']=$jobModel->skills;
		$data = array(
			'success' => true,
			'message' => 'The record updated successfully',
			'data' => [
				'job' => $jobModel,
			]
		);
		return response()->json($data, 200);
	}
	public function destroy($id)
	{
		$this->jobRepository->delete($id);
		$data = array(
			'success' => true,
			'message' => 'The record deleted successfully',
		);
		return response()->json($data, 200);
	}
}
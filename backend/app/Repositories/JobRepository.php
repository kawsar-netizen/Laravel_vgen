<?php
namespace App\Repositories;
use Carbon\Carbon;
class JobRepository extends BaseRepository
{
	public function __construct()
	{
		$jobModel = resolve('App\Models\Job');
		parent::setModel($jobModel);
	}
	public function store($validatedData)
	{
		$job = parent::store($validatedData);
		return $job;
	}
	public function all()
	{
		return parent::all();
	}
	public function update($validatedData, $id)
	{
		return parent::update($validatedData, $id);
	}
	public function delete($id)
	{
		parent::delete($id);
	}
	public function findById($id)
	{
		return parent::findById($id);
	}
	public function findJobWithRelatedSkills($id)
	{
		$job = parent::findById($id);
		$jobArray = [];
		return $jobArray = [ 
			'id' => $job->id,
			'title' => $job->title,
			'description' => $job->description,
			'work_from' => $job->work_from,
			'experience_level' => $job->experience_level,
			'job_type' => $job->job_type,
			'min_budget' => $job->min_budget,
			'max_budget' => $job->max_budget,
			'deadline' => $job->deadline,
			'skills' => $job->skills
		];
	}
	public function getJobWithClient($id)
	{
		$job = parent::findById($id);
         return $jobArray = [
			'description' => $job->description,
			'youCanWorkFrom' => strtolower($job->work_from) == "remote job" ? "Anywhere In The world" : $job->work_from,
			'skills' => $job->skills,
			'work_from' => $job->work_from,
			'budgetRange' => $job->min_budget.'-'.$job->max_budget,
			'time' => $job->created_at->diffForHumans($job->deadline, true),
			'clientName' => $job->valueSeeker->user_name,
			'clientImg' => $job->valueSeeker->img ?? 'not found',
			'country' => $job->valueSeeker->personalInfo->nationality ??'not found',
			'totalProjectCompleted' => $job->valueSeeker->projects->where('status', 2)->count()

		];
	}
	public function getJobs()
	{  
		$jobArray=[];
		$jobs=$this->model->all();
		foreach($jobs as $job)
		{   
			$temporaryArray=[];
			$temporaryArray=[
				'title'=>$job->title,
				'id'=>$job->id,
				'job_type'=>$job->job_type,
				'applyCount'=>$job->applies->count(),
				'viewDetails'=>'seeker/pending/job/'.$job->id.'/applicant-details',
				'viewPost'=>'seeker/pending/job/'.$job->id.'/job-details'
			];
			$jobArray[]=$temporaryArray;
		}
		return $jobArray;
	}
	public function getJobForValueSeekerPendingSelection($id)
	{
		$job = parent::findById($id);
		return $jobArray = [
			'seekerName' => $job->ValueSeeker->user_name,
			'seekerImg' => $job->ValueSeeker->img ?? 'not found',
			'projectsCount' => $job->valueSeeker->projects->where('status', 2)->count(),
			'rating' => $job->ValueSeeker->ratings->avg('rating') ?? 0,
			'country_code' => $job->ValueSeeker->personalInfo->nationality ?? 'not found',
			'jobTitle' => $job->title,
			'jobId' => $job->id,
			'jobType' => $job->job_type,
			'budget' => $job->max_budget,
			'duration' => $job->created_at->diffForHumans($job->deadline, true),
			'editLink' => 'seeker/job/'.$job->id.'/edit',
			'jobDetail' => $job->description,
			'youCanWorkFrom' => strtolower($job->work_from) == 'remote job' ? 'Anywhere In The world': $job->work_from,
			'skills' => $job->skills,
			'budgetRange' => $job->min_budget.'-'.$job->max_budget,
			'workFrom' => $job->work_from,
			'time' => $job->created_at->diffForHumans($job->deadline, true)
		];
	}
	public function getApprovedJobs($query)
	{   
		if($query)
		{
			return $this->model
			->where([
				['max_budget', 'like', '%'.$query.'%'],
				['active_status','=',1]

			])->orWhereHas('skills', function ($q) use ($query) {
				$q->where([
					['skill', 'like', '%'.$query.'%'],
					['jobs.active_status','=',1]
				]);
				
			})->orWhere([
				['title', 'like', '%'.$query.'%'],
				['active_status','=',1]

			])->orWhere([
				['job_type', 'like', '%'.$query.'%'],
				['active_status','=',1]

			])->orWhere([
				['experience_level', 'like', '%'.$query.'%'],
				['active_status','=',1]

			])->orWhere([
				['id', 'like', '%'.$query.'%'],
				['active_status','=',1]

			])
			->latest()
			->paginate(10);
		}
		else
		{
			return $this->model->where('active_status', 1)
			->latest()
			->paginate(10);
		}

	}
	public function getJobForBid($id)
	{
		$job=parent::findById($id);
		$jobArray=[];
		return $jobArray=[
			'jobId'=>$job->id,
			'title'=>$job->title,
			'job_type'=>$job->job_type,
			'budget'=>$job->max_budget,
			'duration' => $job->created_at->diffForHumans($job->deadline, true),
			'seekerImg'=>$job->valueSeeker->img,
			'seekerName'=>$job->valueSeeker->user_name,
			'rating'=>$job->ValueSeeker->ratings->avg('rating') ?? 0,
			'projectsCount'=>$job->valueSeeker->projects->where('status', 2)->count(),
			'country'=>$job->ValueSeeker->personalInfo->nationality ?? 'not found',
			'jobPostedTime'=>$job->created_at->diffForHumans(),
			 'viewJobDetails'=> "generator/job/$job->id/details",
			'send'=> "generator/job/apply/$job->id"
		];
	}
		public function findJobForAdminDashboard($id)
	{
		$job=parent::findById($id);
		$jobArray=[];
		return $jobArray=[
			'userId' => $job->valueSeeker->id,
			'name' => $job->title,
			'jobId' => $job->id,
			'postedDate' => $job->created_at->toDateString(),
			'budget' => $job->max_budget,
			'status' => $job->active_status == 1 ? 'Active' : 'Not Active',
			'approve' => "admin/job-approve/$job->id",
			'jobDetail' => $job->description,
			'youCanWorkFrom' => strtolower($job->work_from)=='remote job' ? 'Anywhere In The World': $job->work_from,
			'skills' => $job->skills,
			'workFrom' => $job->work_from,
			'budgetRange' => "$job->min_budget-$job->max_budget",
			'time' => $job->created_at->diffForHumans($job->deadline, true)
		];
	}
	public function searchByField($query)
	{
		if($query)
		{
			return $this->model->where('value_seeker_id', 'like', '%'.$query.'%')->orwhereHas('ValueSeeker', function($q) use ($query) {
				$q->where('user_name', 'like', '%'.$query.'%');
			})->orWhere('title', 'like', '%'.$query.'%')
			->orWhere('id', 'like', '%'.$query.'%')
			->orWhereDate('created_at', 'like', '%'.$query.'%')
			->orWhere('max_budget', 'like', '%'.$query.'%')
			->orWhere('active_status', $this->convertStatusToBoolean($query))
			->latest()
			->paginate(10);
		}
		else
			return parent::all();
	}
	public function convertStatusToBoolean($active_status)
	{
		if(strtolower(trim($active_status))=='active')
			return 1;
		if(strtolower(preg_replace('/\s+/', '', $active_status))=='notactive')
			return 0;
	}
}

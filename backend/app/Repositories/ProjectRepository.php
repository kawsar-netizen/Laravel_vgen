<?php

namespace App\Repositories;
use Carbon\Carbon;

class ProjectRepository extends BaseRepository
{
	public function __construct()
	{
		$projectModel = resolve('App\Models\Project');
		parent::setModel($projectModel);
	}
	public function getValueGeneratorOngoingProjects($id)
	{
		$projects=$this->model->where(['status'=>0,'value_generator_id'=>$id])->get();
		$projectsWithJobArray=[];
		foreach($projects as $project)
		{
			$temporaryArray=[];
			$temporaryArray=[
				'jobTitle'=>$project->job->title,
				'jobId'=>$project->job->id,
				'jobType'=>$project->job->job_type,
				'Progress'=>$project->progress.'%',
				'durationLeft'=>$this->calculateDurationLeftInDays($project->deadline, Carbon::now())
			];
			$projectWithJobArray[]=$temporaryArray;
		}
		return $projectWithJobArray??'Not found any record';
	}
	public function getValueSeekerOngoingProjects($id)
	{
		$projects=$this->model->where(['status'=>0,'value_seeker_id'=>$id])->get();
		$projectsWithJobArray=[];
		foreach($projects as $project)
		{
			$temporaryArray=[];
			$temporaryArray=[
				'jobTitle'=>$project->job->title,
				'jobId'=>$project->job->id,
				'jobType'=>$project->job->job_type,
				'Progress'=>$project->progress.'%',
				'durationLeft'=>$this->calculateDurationLeftInDays($project->deadline, Carbon::now()),
				'projectId'=>$project->id,
				'viewDetail'=>"seeker/ongoing-task/$project->id/details"
			];
			$projectWithJobArray[]=$temporaryArray;
		}
		return $projectWithJobArray??'Not found any record';
	}
	public function getValueSeekerOngoingProjectDetails($id)
	{
		$project=$this->model->findOrFail($id);		
		$projectWithJobArray=[];
		$projectWithJobArray=[
			'jobTitle'=>$project->job->title,
			'jobId'=>$project->job->id,
			'jobType'=>$project->job->job_type,
			'Progress'=>$project->progress.'%',
			'durationLeft'=>$this->calculateDurationLeftInDays($project->deadline, Carbon::now()),
			'valueGeneratorImg'=>$project->valueGenerator->personalInfo->face_img ?? 'not found',
			'valueGeneratorName'=>$project->valueGenerator->user_name,
			'district'=>$project->valueGenerator->address->present_district?? 'not found',
			'country'=>$project->valueGenerator->personalInfo->nationality ?? 'not found',
			'budget'=>$project->amount,
			'files'=>$project->files
		];
		
		return $projectWithJobArray??'Not found any record';
	}

	public function calculateDurationLeftInDays($deadline,$currentTime)
	{
		$difference=strtotime($deadline)-strtotime($currentTime);
		if($difference<=0)
			return 'Time Over';
		else
		{   
			$currentTime = Carbon::parse($currentTime);
			$deadline = Carbon::parse($deadline);
			$days = $currentTime->diffInDays($deadline);
			
			return "$days days";
		}
	}
	public function getProject($id)
	{  
		$project=parent::findById($id);
		if($project)
		{
			return $projectWithJob=[
				'jobTitle'=>$project->job->title,
				'jobId'=>$project->job->id,
				'jobType'=>$project->job->job_type,
				'Progress'=>$project->progress.'%',
				'durationLeft'=>$this->calculateDurationLeftInDetails($project->deadline, Carbon::now()),
				'viewJobDetails'=>'seeker/job/'.$project->job->id
			];
		}
		else
			return "Not found any record";

	}

	public function calculateDurationLeftInDetails($deadline,$currentTime)
	{
		$difference=strtotime($deadline)-strtotime($currentTime);
		if($difference<=0)
			return 'Time Over';
		else
		{   
			$currentTime = Carbon::parse($currentTime);
			$deadline = Carbon::parse($deadline);
			$days = $currentTime->diffInDays($deadline);
			$hours = $currentTime->copy()->addDays($days)->diffInHours($deadline);
			$minutes=$currentTime->copy()->addDays($days)->addHours($hours)->diffInMinutes($deadline);
			$seconds = $currentTime->copy()->addDays($days)->addHours($hours)->addMinutes($minutes)->diffInSeconds($deadline);
			return "$days days $hours hours $minutes minutes $seconds seconds";
		}
	}
	public function getValueGeneratorCompletedProjects($id)
	{
		$projects = $this->model->where(['status' => 2, 'value_generator_id' => $id])->paginate(10);
		return $projects;
	}

	public function getValueSeekerCompletedProjects($valueSeekerId)
	{
		$projects = $this->model->where(['status' => 2, 'payment_status' => 0, 'value_seeker_id' => $valueSeekerId])->paginate(10);
		return $projects;
	}
	public function getValueSeekerCompletedProjectDetails($id)
	{    
		$project=parent::findById($id);
		$projectDetailsArray=[];
		return $projectDetails=[
			'jobTitle'=>$project->job->title,
			'jobType'=>$project->job->job_type,
			'jobId'=>$project->job->id,
			'projectProgress'=>"$project->progress%",
			'taskCompleted'=>$project->completion_date ? 1 : 0,
			'viewJobDetails'=>'seeker/job/'.$project->job->id,
			'durationLeft'=>$this->calculateDurationLeftInDetails($project->deadline, Carbon::now()),


		];

	}
	public function getValueGeneratorCompletedTaskDetails($id)
	{    
		$project=parent::findById($id);
		$projectDetailsArray=[];
		return $projectDetails=[
			'jobTitle'=>$project->job->title,
			'jobType'=>$project->job->job_type,
			'jobId'=>$project->job->id,
			'projectProgress'=>"$project->progress%",
			'viewJobDetails'=>'generator/job/'.$project->job->id,
			'payment_status'=>$this->getPaymentStatusFromIntegerToString($project->payment_status),
			'completion_date'=>Carbon::parse($project->completion_date)->format('d/m/Y'),
			'reason'=>$this->getReason($project->payment_status),
			'sharedFiles'=>$project->file,
			'clientDetails'=>['user_name'=>$project->valueSeeker->user_name,
			'image'=>$project->valueSeeker->img,
			'country'=>$project->valueSeeker->personalInfo->nationality
		]

	];

}
public function updateProgress($progress,$id)
{   
	$projectModel=parent::findById($id);
	$projectModel->progress=$progress;
	$projectModel->save();
	return $projectModel;
}
public function getPendingPayments()
{
	return $pendingPaymentsProjects=$this->model
	->where(['status'=>2, 'payment_status'=>0])
	->paginate(10);

}
public function getValueActive()
{
	return parent::all();
}
public function getReason($payment_status)
{
	if ($payment_status == 0) {
		return 'Bank Delay';
	}
	else
		return '';
}
public function getPaymentStatusFromIntegerToString($payment_status)
{
	if($payment_status==0)
		return 'Payment Pending';
	else
		return 'Payment Received';
}
public function storeProjectCompletionDate($status,$id)
{
   if($status==1)
   {
       $project=parent::findById($id);
       $project->completion_date;   }
}
}


<?php
namespace App\Repositories;
class ApplyRepository extends BaseRepository
{
	public function __construct()
	{
		$applyModel=resolve('App\Models\Apply');
		parent::setModel($applyModel);
	}
	public function storeApply($validatedData,$job)
	{
		$apply=$this->model;
		$apply->value_generator_id=$validatedData['value_generator_id'];
		$apply->message=$validatedData['message'];
		$apply->budget=$job->max_budget;
		$apply->duration=$job->duration;
		$apply->job()->associate($job);
		$apply->save();
		return $apply;
	}
	public function getApplicantDetails($id)
	{
		$applies=$this->model->where('job_id',$id)->paginate(10);
		return $applies;
	}
	public function getApply($id)
	{
		$apply = parent::findById($id);
		$applyArray = [];
		return $applyArray = [
        'seekerName' => $apply->job->valueSeeker->user_name,
        'message' => $apply->message
		];
	}
	public function getApplyInformation($applyModel)
	{
		$applyArray = [];
	   return $applyArray = [
				'jobId' => $applyModel->job->id,
				'title' => $applyModel->job->title,
				'job_type' => $applyModel->job->job_type,
				'budget' => $applyModel->job->max_budget,
				'duration'  => $applyModel->job->created_at->diffForHumans($applyModel->job->deadline, true),
				'seekerImg' => $applyModel->job->valueSeeker->img ?? 'not found',
				'seekerName' => $applyModel->job->valueSeeker->user_name,
				'rating' => $applyModel->job->ValueSeeker->ratings->avg('rating') ?? 0,
				'projectsCount' => $applyModel->job->valueSeeker->projects->where('status', 2)->count(),
				'country' => $applyModel->job->ValueSeeker->personalInfo->nationality ?? 'not found',
				'youBidHere' => "generator/you-bid-here/$applyModel->id"
			];
	}
}


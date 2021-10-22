<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
class ValueGeneratorJobCollection extends ResourceCollection
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array
	 */
	public function toArray($request)
	{
		$jobArray=[];
		$valueGeneratorId = Auth::guard('vg-api')->user()->id;
		foreach ($this->collection as $job)
		{
			$temporaryArray=[];
			$apply=$job->applies->where('value_generator_id', $valueGeneratorId)->first();
			if(is_null($apply))
			{
				$temporaryArray=[
					'jobId'=>$job->id,
					'title'=>$job->title,
					'job_type'=>$job->job_type,
					'budget'=>$job->max_budget,
					'duration' => $job->created_at->diffForHumans($job->deadline, true),
					'image'=>$job->valueSeeker->img ?? 'not found',
					'name'=>$job->valueSeeker->user_name,
					'rating'=>$job->ValueSeeker->ratings->avg('rating') ?? 0,
					'projectsCount'=>$job->valueSeeker->projects->where('status', 2)->count(),
					'country'=>$job->ValueSeeker->personalInfo->nationality ?? 'not found',
					'jobPostedTime'=>$job->created_at->diffForHumans(),
					'BidForIt'=>"generator/bid-for-it/$job->id"
				];

			}
			else
			{

				$temporaryArray=[
					'jobId'=>$job->id,
					'title'=>$job->title,
					'job_type'=>$job->job_type,
					'budget'=>$job->max_budget,
					'duration' => $job->created_at->diffForHumans($job->deadline, true),
					'image'=>$job->valueSeeker->img ?? 'not found',
					'name'=>$job->valueSeeker->user_name,
					'rating'=>$job->ValueSeeker->ratings->avg('rating') ?? 0,
					'projectsCount'=>$job->valueSeeker->projects->where('status', 2)->count(),
					'country'=>$job->ValueSeeker->personalInfo->nationality ?? 'not found',
					'jobPostedTime'=>$job->created_at->diffForHumans(),
					'bidId'=>$apply->id,
					'youBidHere' =>"generator/you-bid-here/$apply->id"
				];
			}

			$jobArray[]=$temporaryArray;
		}
		return[
<<<<<<< HEAD
		    'jobsCount' =>$this->collection->count(),
			'data' => $jobs
        ];
=======
			'jobsCount' =>$this->collection->count(),
			'data' => $jobArray
		];
>>>>>>> vgen-frontend-rony
	}
}

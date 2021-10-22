<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AdminJobApprovalsCollection extends ResourceCollection
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array
	 */
	public function toArray($request)
	{
		$jobArray = [];
		foreach ($this->collection as $job)
		{
			$temporaryArray = [
				'userId' => $job->value_seeker_id,
				'name' => $job->valueSeeker->user_name,
				'jobId' => $job->id,
				'jobTitle' => mb_strimwidth($job->title, 0, 20, '...'),
				'postedDate' => $job->created_at->toDateString(),
				'budget' => $job->max_budget,
				'status' => $job->active_status == 1 ? 'Active': 'Not Active',
				'approve' => "admin/job-approve/$job->id",
				'viewPost' => "admin/job/$job->id"
			];
			$jobArray[] = $temporaryArray;
		}
		return [
			'data' => $jobArray
    ];
	}
}

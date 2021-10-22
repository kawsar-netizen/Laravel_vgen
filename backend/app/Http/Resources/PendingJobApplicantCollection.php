<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PendingJobApplicantCollection extends ResourceCollection
{
<<<<<<< HEAD
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
=======
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array
	 */
	public function toArray($request)
	{
		$applyArray=[];
		$i=1;
		foreach($this->collection as $apply)
		{
			$temporaryArray=[];
			$temporaryArray=[
				'serialNo'=>$i++,
				'name'=>$apply->valueGenerator->user_name,
				'Applydate'=>$apply->created_at->toDateString(),
				'totalProjects'=>$apply->valueGenerator->completed_projects??0,
				'message'=>$apply->message,
				'jobTitle'=>$apply->job->title,
				'jobType'=>$apply->job->job_type,
				'applicantId'=>$apply->valueGenerator->id,
				'viewProfile'=>'generator/view-profile/'.$apply->valueGenerator->id,
				'chat'=>''
			];
			$applyArray[]=$temporaryArray;
		}
	 return[
			'data' => $applyArray
		   ];
	}

>>>>>>> vgen-frontend-rony
}

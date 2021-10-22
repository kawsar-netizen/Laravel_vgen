<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Carbon\Carbon;
class AdminPaymentDasboardValueActiveCollection extends ResourceCollection
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array
	 */
	public function toArray($request)
	{
		$valueActiveArray=[];
		foreach($this->collection as $project)
		{
			$temporaryArray=[];
			$temporaryArray=[
				'VGID'=>$project->value_generator_id,
				'VGName'=>$project->valueGenerator->user_name,
				'VSID'=>$project->value_seeker_id,
				'VSName'=>$project->valueSeeker->user_name,
				'Total duration'=>$project->created_at->diffForHumans($project->deadline,true),
            'ProjectStarted'=>$project->created_at->toDateString(),
				'value'=>$project->amount,
				'action'=>['workProcess' => 'unknown yet']
			];
			$valueActiveArray[]=$temporaryArray;
		}
		return[
			'data'=>$valueActiveArray
		];

	}
}

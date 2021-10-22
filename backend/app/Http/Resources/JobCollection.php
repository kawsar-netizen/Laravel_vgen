<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class JobCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        $jobArray=[];
        foreach ($this->collection as $job)
         {
            $temporaryArray=[];
            $temporaryArray=[
            'id'=>$job->id,
             'title'=>$job->title,
             'description'=>$job->description,
             'work_from'=>$job->work_from,
             'job_type'=>$job->job_type,
             'min_budget'=>$job->min_budget,
             'max_budget'=>$job->max_budget,
             'deadline'=>$job->deadline,
             'skills'=>$job->skills
             ];
             $jobArray[]=$temporaryArray;
         }
        return[
            'data' => $jobArray

        ];
    }
}

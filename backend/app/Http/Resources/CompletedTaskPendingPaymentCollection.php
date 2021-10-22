<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CompletedTaskPendingPaymentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $projectWithJobArray=[];
        foreach($this->collection as $project)
        {
            $temporaryArray=[];
            $temporaryArray=[
                'jobTitle'=>$project->job->title,
                'jobType'=>$project->job->job_type,
                'jobId'=>$project->job->id,
                'projectStatus'=>'Completed',
                'payment_status'=>$this->getPaymentStatusFromIntegerToString($project->payment_status),
                'viewDetails'=>"seeker/completed-task/$project->id/details"
            ];
            $projectWithJobArray[]=$temporaryArray;
        }
        return[
            'data' => $projectWithJobArray
             ];
    }
    public function getPaymentStatusFromIntegerToString($payment_status)
    {
        if($payment_status==0)
            return 'Payment Pending';
        else
           return 'Payment Received';
    }
}

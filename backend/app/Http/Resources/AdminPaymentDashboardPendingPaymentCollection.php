<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Carbon\Carbon;
class AdminPaymentDashboardPendingPaymentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $pendingPaymentProjectArray=[];
        foreach($this->collection as $pendingPaymentProject)
        {
            $temporaryArray=[];
            $temporaryArray=[
                'workId'=>$pendingPaymentProject->id,
                'valueSeekerId'=>$pendingPaymentProject->value_seeker_id,
                'valueGeneratorId'=>$pendingPaymentProject->value_generator_id,
                'projectStart'=>$pendingPaymentProject->created_at->toDateString(),
                'duration'=>$pendingPaymentProject->created_at->diffForHumans($pendingPaymentProject->deadline, true),
                'value'=>$pendingPaymentProject->amount,
                'taskStatus'=>'completed',
                'payment'=>'pending',
                'action'=>['Pay to vG' => 'unknown yet', 'Invoice' => 'admin/seeker-work-invoice/'.$pendingPaymentProject->id, 'Contact' => 'unknown yet']
            ];
            $pendingPaymentProjectArray[]=$temporaryArray;
        }
        return[
          'data'=>$pendingPaymentProjectArray
      ];
  }
}

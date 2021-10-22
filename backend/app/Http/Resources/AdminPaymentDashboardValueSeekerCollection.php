<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AdminPaymentDashboardValueSeekerCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $valueSeekerArray=[];
        foreach($this->collection as $valueSeeker)
        {
            $temporaryArray=[];
            $temporaryArray=[
                'userId'=>$valueSeeker->id,
                'name'=>$valueSeeker->user_name,
                'projects'=>$valueSeeker->projects->count(),
                'accountCreated'=>$valueSeeker->created_at->toDateString(),
                'totalValuePosted'=>$valueSeeker->projects->sum('amount') ?? 0,
                'rating'=>$valueSeeker->ratings->avg('rating') ?? 0,
                'status'=>'active',
                'action'=>['viewHistory'=>'admin/payment/seeker/'.$valueSeeker->id.'/view-history','viewProfile'=>'admin/seeker-information/'.$valueSeeker->id]

            ];
            $valueSeekerArray[]=$temporaryArray;
        }
        return[
          'data'=>$valueSeekerArray
        ];
    }
}

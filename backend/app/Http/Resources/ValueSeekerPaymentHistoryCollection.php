<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Carbon\Carbon;
class ValueSeekerPaymentHistoryCollection extends ResourceCollection
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array
	 */
	public function toArray($request)
	{
		$paymentHistoryArray=[];
		foreach($this->collection as $transaction)
		{
			$temporaryArray=[];
			$temporaryArray=[
			   'jobTitle' => $transaction->job->title,
			   'transaction\'s date' => $transaction->created_at->toDateString(),
			   'amount' => $transaction->amount,
			   'paymentMethod' => $transaction->payment_method,
			   'status' => $this->getStatusFromIntegerToString($transaction->status),
			   'partialpayment' => $this->checkPartialPaymentStatus($transaction->partial_payment),
			   'currency' => $transaction->currency ??''
			];
			$paymentHistoryArray[]=$temporaryArray;
		}
		return ['paymentHistory' => $paymentHistoryArray];
	}
	public function getStatusFromIntegerToString($status)
	{
	   return $status==1 ? 'paid': 'pending';
	}
	public function checkPartialPaymentStatus($status)
	{
		return $status==1 ? 'Partial Payment' : '';
	}
}

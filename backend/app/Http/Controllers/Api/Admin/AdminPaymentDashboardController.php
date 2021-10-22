<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AdminPaymentDashboardValueSeekerCollection;
use App\Http\Resources\AdminPaymentDasboardValueActiveCollection;
use App\Http\Resources\AdminPaymentDashboardPendingPaymentCollection;
use App\Http\Resources\ValueSeekerPaymentHistoryCollection;

class AdminPaymentDashboardController extends Controller
{
	public function getValueSeekersDetails()
	{   
		$valueSeekerRepository=resolve('App\Repositories\ValueSeekerRepository');
		$valueSeekersDetails=$valueSeekerRepository->getValueSeekersDetails();
		return new AdminPaymentDashboardValueSeekerCollection($valueSeekersDetails);
	}
	public function viewHistory($valueSeekerId)
	{
		$transactionRepository=resolve('App\Repositories\TransactionRepository');
		$paymentHistory=$transactionRepository->viewValueSeekerPaymentHistory($valueSeekerId);
        return new ValueSeekerPaymentHistoryCollection($paymentHistory);
	}
	public function getPendingPayments()
	{
		$projectRepository=resolve('App\Repositories\ProjectRepository');
		$pendingPaymentProjects=$projectRepository->getPendingPayments();
		return new AdminPaymentDashboardPendingPaymentCollection($pendingPaymentProjects);
	}
	public function getValueActive()
	{
		$projectRepository=resolve('App\Repositories\ProjectRepository');
		$valueActive=$projectRepository->getValueActive();
		return new AdminPaymentDasboardValueActiveCollection($valueActive);

	}
}

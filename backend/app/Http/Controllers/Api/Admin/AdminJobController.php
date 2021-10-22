<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminJobApprovalsCollection;

class AdminJobController extends Controller
{
	protected $jobRepository;
	public function __construct()
	{
		$this->jobRepository=resolve('App\Repositories\jobRepository');
	}
	public function approve($id)
	{
		$job = $this->jobRepository->findById($id);
		if ($job)
		{
			if($job->active_status == 0)
			{
				$job->active_status = 1;
				$job->save();
				$data = array(
					'success' => true,
					'message' =>  'Job approved successfully'
				);

			}
			else
			{
				$job->active_status = 0;
				$job->save();
				$data = array(
					'success' => true,
					'message' =>  'Job disapproved successfully'
				);

			}
		} 
		else 
		{
			$data = array(
				'success' => false,
				'message' =>  'No record Found'
			);
		}
		return response()->json($data, 200);
	}
	public function getJobs($query = null)
	{
		$jobs = $this->jobRepository->searchByField($query);
		return new AdminJobApprovalsCollection($jobs);
	}
	public function findById($id)
	{
		$job = $this->jobRepository->findJobForAdminDashboard($id);
		$data = array(
			'success' => true,
			'data' => ['job' => $job],
		);
		return response()->json($data, 200);
	}
}

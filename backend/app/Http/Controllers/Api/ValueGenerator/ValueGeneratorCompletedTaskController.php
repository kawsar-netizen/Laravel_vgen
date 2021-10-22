<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CompletedTaskPendingPaymentCollection;

class ValueGeneratorCompletedTaskController extends Controller
{  
   protected $projectRepository;
   public function __construct()
    {
        $this->projectRepository = resolve('App\Repositories\ProjectRepository');
    }
    public function getCompletedTasks()
    {   
        $valueGeneratorId=Auth::guard('vg-api')->user()->id;
        $projects=$this->projectRepository->getValueGeneratorCompletedProjects($valueGeneratorId);
        return new CompletedTaskPendingPaymentCollection($projects);
    }
    public function getCompletedTaskDetails($id)
    {
        $project=$this->projectRepository->getValueGeneratorCompletedTaskDetails($id);
        $data = array(
            'success' => true,
            'data' => [
                'projectDetails' => $project,
            ]
        );
        return response()->json($data, 200);


    }
}

<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CompletedTaskPendingPaymentCollection;
use Illuminate\Support\Facades\Auth;

class ValueSeekerCompletedTaskController extends Controller
{  
   protected $projectRepository;
   public function __construct()
    {
        $this->projectRepository = resolve('App\Repositories\ProjectRepository');
    }
    public function getCompletedTasks()
    {
        $valueSeekerId=Auth::guard('vs-api')->user()->id;
        $projects=$this->projectRepository->getValueSeekerCompletedProjects($valueSeekerId);
        
        return new CompletedTaskPendingPaymentCollection($projects);
    }
    public function getCompletedTaskDetails($projectId)
    {
        $project=$this->projectRepository->getValueSeekerCompletedProjectDetails($projectId);
        return response()->json(['projectDetails'=>$project], 200);
        
    }
    public function storeProjectCompletionDate(Request $request, $projectId)
    {   
        $projectStatus=$request->taskCompleted;
        $project=$this->projectRepository->storeProjectCompletionDate($projectStatus, $projectId);
        return response()->json(['projectDetails'=>$project], 200);
        
    }


}

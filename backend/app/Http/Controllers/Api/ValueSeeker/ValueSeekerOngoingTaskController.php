<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ValueSeekerOngoingTaskController extends Controller
{
    protected $projectRepository;
    public function __construct()
    {
        $this->projectRepository = resolve('App\Repositories\ProjectRepository');
    }
    public function getOngoingTasks()
    {
        $valueSeekerId = Auth::guard('vs-api')->user()->id;
        $projects = $this->projectRepository->getValueSeekerOngoingProjects($valueSeekerId);
        return response()->json(['data'=>$projects], 200);
        
    }
    public function getOngoingTaskDetails($projectId)
    {
      $project = $this->projectRepository->getValueSeekerOngoingProjectDetails($projectId);
        return response()->json(['data'=>$project], 200);
    }
}

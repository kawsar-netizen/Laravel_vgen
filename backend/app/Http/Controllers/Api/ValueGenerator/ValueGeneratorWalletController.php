<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ValueGeneratorWallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ValueGeneratorWalletController extends Controller
{
    public function GeneratorWallet()
    {
        try {
            $id = Auth::guard('vg-api')->user()->id;

            $pending = DB::table('projects')
                ->where([['value_generator_id', $id], ['payment_status', 0]])
                ->selectRaw('sum(amount) as pending_amount, count(payment_status) as pending_count')
                ->get();

            $workingOn = DB::table('projects')
                ->where([['value_generator_id', $id], ['status', 0], ['payment_status', 0]])
                ->orWhere([['value_generator_id', $id], ['status', 1], ['payment_status', 0]])
                ->selectRaw('sum(amount) as workingOnAmount, count(id) as ongoing_project_count')
                ->get();

            $TotalEarning = DB::table('projects')
                ->where([['value_generator_id', $id], ['status', 2], ['payment_status', 1]])
                ->selectRaw('sum(amount) as total_earn, count(id) as completed_project_count')
                ->get();

            $pendingDetails =  DB::table('projects')
                ->where([['value_generator_id', $id], ['status', 0], ['payment_status', 0]])
                ->orWhere([['value_generator_id', $id], ['status', 1], ['payment_status', 0]])
                ->join('jobs', 'projects.job_id', '=', 'jobs.id')
                ->select('jobs.id as jobId', 'jobs.title as jobTitle', 'jobs.job_type as jobType', 'projects.total_revision as total_revision', 'projects.Revision_completed as Revision_completed',
                    DB::raw('(CASE
                        WHEN projects.status = "0" THEN "On Going"
                        WHEN projects.status = "1" THEN "Review"
                        ELSE "Completed"
                        END) AS projectStatus')
                )
                ->get();


            return response()->json([
                'success' => true,
                'Pending' => $pending,
                'WorkingOn' => $workingOn,
                'TotalEarning' => $TotalEarning,
                'pendingDetails' => $pendingDetails

            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
}

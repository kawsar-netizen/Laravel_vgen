<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use App\Services\SeekerProfilePercentageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ValueSeekerProfilePercentageController extends Controller
{
    //seeker profile percentage
    public function profilePercentage(){
        $id = Auth::guard('vs-api')->user()->id;
        $percentageResult = SeekerProfilePercentageService::percentage($id);
        return response()->json([
            'percentage' => $percentageResult,
        ],200);
    }
}

<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\GeneratorProfilePercentageService;

class ValueGeneratorProfilePercentageController extends Controller
{
    //generator profile percentage
    public function profilePercentage(){
        $id = Auth::guard('vg-api')->user()->id;
        $percentageResult = GeneratorProfilePercentageService::percentage($id);
        return response()->json([
            'percentage' => $percentageResult,
        ],200);
    }

}

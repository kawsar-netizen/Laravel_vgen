<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use App\Http\Requests\EducationRequest;
use App\Models\Education;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class ValueGeneratorEducationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $id = Auth::guard('vg-api')->user()->id;
            $education = Education::where('value_generator_id',$id)
                ->orderBy('id','DESC')
                ->get();

            return response()->json([
                'success'=>true,
                'Education' => $education

            ],400);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(EducationRequest $request)
    {
        try {
            $id = Auth::guard('vg-api')->user()->id;
            $education = new Education();
            $education -> institute_type = $request -> institute_type;
            $education -> country = $request -> country;
            $education -> major = $request -> major;
            $education -> compilition_year = $request -> compilition_year;
            $education -> value_generator_id = $id;
            $education -> save();
            return response()->json([
                'success'=>true,
                'Message'=> 'Education Added Successfully',
                'Education' => $education
            ],400);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        try {
            $education = Education::where('id',$id)->first();

            return response()->json([
                'success'=>true,
                'editEducation' => $education,

            ],400);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EducationRequest $request, $id)
    {
        try {
            $education = Education::find($id);
            $education -> institute_type = $request -> institute_type;
            $education -> country = $request -> country;
            $education -> major = $request -> major;
            $education -> compilition_year = $request -> compilition_year;
            $education -> save();
            return response()->json([
                'success'=>true,
                'Message'=> 'Education Updated Successfully',
                'Education' => $education
            ],400);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            Education::findOrFail($id)->delete();
            return response()->json([
                'success'=>true,
                'Message'=> 'Education Delete Successfully',
            ],400);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }
}

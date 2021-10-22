<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use App\Http\Requests\CertificateRequest;
use App\Http\Requests\EducationRequest;
use App\Models\Certificate;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ValueGeneratorCertificateController extends Controller
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
            $certificate = Certificate::where('value_generator_id',$id)
                ->orderBy('id','DESC')
                ->get();

            return response()->json([
                'success'=>true,
                'Certificate' => $certificate

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
    public function store(CertificateRequest $request)
    {
        try {
            $id = Auth::guard('vg-api')->user()->id;
            $certificate = new Certificate();
            $certificate -> certification_title = $request -> certification_title;
            $certificate -> certified_by = $request -> certified_by;
            $certificate -> year = $request -> year;
            $certificate -> value_generator_id = $id;
            $certificate -> save();
            return response()->json([
                'success'=>true,
                'Message'=> 'Certificate Added Successfully',
                'Certificate' => $certificate
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
            $certificate = Certificate::where('id',$id)->first();

            return response()->json([
                'success'=>true,
                'EditCertificate' => $certificate

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
    public function update(CertificateRequest $request, $id)
    {
        try {
            $certificate = Certificate::find($id);
            $certificate -> certification_title = $request -> certification_title;
            $certificate -> certified_by = $request -> certified_by;
            $certificate -> year = $request -> year;
            $certificate -> save();
            return response()->json([
                'success'=>true,
                'Message'=> 'Certificate Updated Successfully',
                'Certificate' => $certificate
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
            Certificate::findOrFail($id)->delete();
            return response()->json([
                'success'=>true,
                'Message'=> 'Certificate Deleted Successfully',
            ],400);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }
}

<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use App\Http\Requests\CertificateRequest;
use App\Http\Requests\SkillRequest;
use App\Http\Requests\SkillUpdateRequest;
use App\Models\Certificate;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
Use Illuminate\Support\Facades\Validator;


class ValueGeneratorSkillController extends Controller
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
            $skill = Skill::where('value_generator_id',$id)
                ->orderBy('id','DESC')
                ->get();

            return response()->json([
                'success'=>true,
                'Skill' => $skill

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
    public function store(SkillRequest $request)
    {
        try {
            $id = Auth::guard('vg-api')->user()->id;
            $skill = new Skill();
            $skill -> skill = $request -> skill;
            $skill -> value_generator_id = $id;
            $skill -> save();
            return response()->json([
                'success'=>true,
                'Message'=> 'Skill Added Successfully',
                'Skill' => $skill
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
            $skill = Skill::where('id',$id)->first();

            return response()->json([
                'success'=>true,
                'EditSkill' => $skill

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
    public function update(SkillUpdateRequest $request, $id)
    {
        try {
            $skill = Skill::find($id);
            $skill -> skill = $request -> skill;
            $skill -> save();
            return response()->json([
                'success'=>true,
                'Message'=> 'Skill Updated Successfully',
                'Skill' => $skill,
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
            Skill::findOrFail($id)->delete();
            return response()->json([
                'success'=>true,
                'Message'=> 'Skill Deleted Successfully',
            ],400);
        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage(),
            ],404);
        }
    }
}

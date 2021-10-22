<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LanguageRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Language;

class ValueSeekerLanguageController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		try {
			$id = Auth::guard('vs-api')->user()->id;
			$language = Language::where('value_seeker_id',$id)
			->orderBy('id','DESC')
			->get();

			return response()->json([
				'success'=>true,
				'Language' => $language

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
	 * @return \Illuminate\Http\Response
	 */
	public function store(LanguageRequest $request)
	{
		try {
			$id = Auth::guard('vs-api')->user()->id;
			$language  = new Language();
			$language->language = $request->name;
			$language->level = $request ->level;
			$language->value_seeker_id=$id;
			$language->save();


			return response()->json([
				'success'=>true,
				'Message'=> 'Language Added Successfully',
				'Language' => $language,
				//'data' =>$data

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
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		try {
			$language = Language::where('id',$id)->first();

			return response()->json([
				'success'=>true,
				'editLanguage' => $language

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
	 * @return \Illuminate\Http\Response
	 */
	public function update(LanguageRequest $request, $id)
	{
		try {
			$generatorId = Auth::guard('vs-api')->user()->id;

			$lan = Language::find($id);
			$lan->language = $request->name;
			$lan->level = $request->level;
			$lan -> save();


			return response()->json([
				'success'=>true,
				'Message'=> 'Language Updated Successfully',
				'Language' => $lan,
                //'data' =>$data

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
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		try {
			Language::find($id)->delete();
			return response()->json([
				'success'=>true,
				'Message'=> 'Language Delete Successfully',
			],400);
		}catch (\Exception $exception){
			return response()->json([
				'success'=>false,
				'message' => $exception->getMessage(),
			],404);
		}
	}
}

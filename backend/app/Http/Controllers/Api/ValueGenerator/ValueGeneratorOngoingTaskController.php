<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ValueGeneratorOngoingTaskController extends Controller
{   
	protected $projectRepository;
	public function __construct()
	{
		$this->projectRepository=resolve('App\Repositories\ProjectRepository');
	}

	public function getOngoingTasks()
	{
		$valueGeneratorId= Auth::guard('vg-api')->user()->id;
		$projects=$this->projectRepository->getValueGeneratorOngoingProjects($valueGeneratorId);
		return response()->json(['data'=>$projects]);
	}

	public function getProject($id)
	{
		$project=$this->projectRepository->getProject($id);
		return response()->json(['data'=>$project]);
	}
	public function updateProgress(Request $request,$id)
	{
		$validator = Validator::make(
			$request->all(),
			[
				'progress' => 'required'
			]
		);
		if ($validator->fails()) 
		{
			return response()->json(
				[
					'status' => false,
					'errors' => $validator->errors(),
				],
				202
			);
		}
		$progress=rtrim($request->progress,"%");
		$updatedProgress=$this->projectRepository->updateProgress($progress,$id);
		$data = array(
			'success' => true,
			'message' => 'Progress updated successfully',
			'data' => [
				'progress' => $updatedProgress->progress.'%',
			]
		);
		return response()->json($data, 200);
	}
	
	public function storeFile(Request $request, $id)
	{
		$validator = Validator::make(
			$request->all(),
			[
				'file' => 'required'
			]
		);

		if ($validator->fails()) 
		{
			return response()->json(
				[
					'status' => false,
					'error' => 'Please choose file',
				],
				202
			);
		}
// use check file availbilty 
		if($request->hasFile('file'))
		{
			$file=$request->file('file');
			$fileName=$file->getClientOriginalName();
			$filePath = $file->store('files');
			$fileRepository=resolve('App\Repositories\FileRepository');
			$storedFile=$fileRepository->storeValueGeneratorFile($filePath, $fileName, $id);
			$data = array(
				'success' => true,
				'message' => 'The file uploaded successfully',
				'data' => [
					'file' => $storedFile->file_name,
				]
			);
			return response()->json($data, 200);
		}
		
	}


}

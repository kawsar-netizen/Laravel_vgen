<?php
namespace App\Http\Controllers\Api\ValueGenerator;
use App\Http\Requests\ValueGenerator\ApplyRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ValueGeneratorApplyController extends Controller
{
	private $jobRepository,$applyRepository;
	public function __construct()
	{
		$this->jobRepository = resolve('App\Repositories\JobRepository');
		$this->applyRepository = resolve('App\Repositories\ApplyRepository');
	}
	public function store($id, ApplyRequest $request)
	{
		$generatorId = Auth::guard('vg-api')->user()->id;
		$job = $this->jobRepository->findById($id);
		$apply=$job->applies->where('value_generator_id', $generatorId)->first();
		if(is_null($apply))
		{
			$validatedData = $request->validated();
			$validatedData['value_generator_id'] = $generatorId;
			$applyModel = $this->applyRepository->storeApply($validatedData, $job);
			$applyInformation = $this->applyRepository->getApplyInformation($applyModel);
			$data = array(
				'success' => true,
				'message' => 'The apply has been saved successfully',
				'your bid message' => $applyModel->message,
				'bidId' => $applyModel->id,
				'apply' => $applyInformation
			);
			return response()->json($data, 200);

		}
		else
		{
			$data = array(
				'success' => false,
				'message' => 'You already bid here'
			);
			return response()->json($data, 422);

		}
	}
	public function getApply($id)
	{
		$applyModel = $this->applyRepository->getApply($id);
		$data = array(
			'success' => true,
			'apply' => $applyModel
		); 
		return response()->json($data, 200); 
	}
}

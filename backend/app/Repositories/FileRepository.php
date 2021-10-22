<?php
namespace App\Repositories;
class FileRepository extends BaseRepository
{ 
	protected $projectRepository;
	public function __construct()
	{
		$fileModel=resolve('App\Models\File');
		parent::setModel($fileModel);
		$this->projectRepository=resolve('App\Repositories\ProjectRepository');
	}
	public function storeValueGeneratorFile($filePath, $fileName, $id)
	{
		$projectModel=$this->projectRepository->findById($id);
		$projectId=$id;
		$valueGeneratorId=$projectModel->value_generator_id;
		$valueSeekerId=$projectModel->value_seeker_id;
		$fileModel=$this->model;
		$fileModel->value_generator_id=$valueGeneratorId;
		$fileModel->value_seeker_id=$valueSeekerId;
		$fileModel->project_id=$id;
		$fileModel->file=$filePath;
		$fileModel->file_name=$fileName;
		$fileModel->initiator=$valueGeneratorId;
		$fileModel->save();
		return $fileModel;
	}

}
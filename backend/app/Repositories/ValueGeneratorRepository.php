<?php
namespace App\Repositories;

class ValueGeneratorRepository extends BaseRepository
{
  public function __construct()
  {
  	$valueGeneratorModel=resolve('App\Models\ValueGenerator');
  	parent::setModel($valueGeneratorModel);
  }
  public function getValueGeneratorProfile($id)
  {
    $valueGenerator = $this->model->findOrFail($id);
    $valueGeneratorArray = [];
    return $valueGeneratorArray = [
      'firstName' => $valueGenerator->first_name,
      'lastName' => $valueGenerator->last_name,
     'completedProjects' => $valueGenerator->projects->where('status', 2)->count(),
      'languages' => $valueGenerator->languages,
      'aboutMe' => $valueGenerator->personalInfo->description ?? 'not found',
      'profilePicture' => $valueGenerator->personalInfo->face_img ?? 'not found',
      'instituteName' => $valueGenerator->educationInstitute,
      'instituteCountry' => $valueGenerator->country,
     'certificationTitle' => $valueGenerator->certificationTitle,
     'certifiedBy' => $valueGenerator->certifiedBy,
   ];
  }
}
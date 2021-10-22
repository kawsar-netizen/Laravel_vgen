<?php
namespace App\Repositories;

class ValueSeekerRepository extends BaseRepository
{
  public function __construct()
  {
  	$valueSeekerModel=resolve('App\Models\ValueSeeker');
  	parent::setModel($valueSeekerModel);
  }
  public function getValueSeekersDetails()
  {
    $valueSeekersDetails=$this->model->where('active_status', 1)->paginate(10);
    return $valueSeekersDetails;
  }
}
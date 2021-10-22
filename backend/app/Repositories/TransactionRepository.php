<?php
namespace App\Repositories;
class TransactionRepository extends BaseRepository
{
	public function __construct()
	{
		$transactionModel=resolve('App\Models\Transaction');
		parent::setModel($transactionModel);
	}

	public function viewValueSeekerPaymentHistory($id)
	{
		return $this->model->where('value_seeker_id',$id)->latest()->paginate(10);
	}
}


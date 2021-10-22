<?php

namespace App\Repositories;

class BaseRepository
{
	protected $model;
	public function setModel($model)
	{
		$this->model = $model;
	}
	public function store(array $data)
	{
		$model = $this->model->create($data);
		return $model;
	}
	public function findById($id)
	{
		return $this->model->where('id', $id)->first();
	}
	public function all()
	{
		return $this->model->latest()->paginate(10);
	}
	public function delete($id)
	{
		$this->model->destroy($id);
	}

	public function update(array $data, $id)
	{
		$model = $this->model->findOrFail($id);
		$model->update($data);
		return $model;
	}
}

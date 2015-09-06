<?php

namespace App\Libraries\Repositories;


use App\Models\ClientProgress;
use Illuminate\Support\Facades\Schema;

class ClientProgressRepository
{

	/**
	 * Returns all ClientProgresses
	 *
	 * @return \Illuminate\Database\Eloquent\Collection|static[]
	 */
	public function all()
	{
		return ClientProgress::all();
	}

	public function search($input)
    {
        $query = ClientProgress::query();

        $columns = Schema::getColumnListing('client_progresses');
        $attributes = array();

        foreach($columns as $attribute){
            if(isset($input[$attribute]))
            {
                $query->where($attribute, $input[$attribute]);
                $attributes[$attribute] =  $input[$attribute];
            }else{
                $attributes[$attribute] =  null;
            }
        };

        return [$query->get(), $attributes];

    }

	/**
	 * Stores ClientProgress into database
	 *
	 * @param array $input
	 *
	 * @return ClientProgress
	 */
	public function store($input)
	{
		return ClientProgress::create($input);
	}

	/**
	 * Find ClientProgress by given id
	 *
	 * @param int $id
	 *
	 * @return \Illuminate\Support\Collection|null|static|ClientProgress
	 */
	public function findClientProgressById($id)
	{
		return ClientProgress::find($id);
	}

	/**
	 * Updates ClientProgress into database
	 *
	 * @param ClientProgress $clientProgress
	 * @param array $input
	 *
	 * @return ClientProgress
	 */
	public function update($clientProgress, $input)
	{
		$clientProgress->fill($input);
		$clientProgress->save();

		return $clientProgress;
	}
}
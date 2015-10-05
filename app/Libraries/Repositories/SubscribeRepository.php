<?php

namespace App\Libraries\Repositories;


use App\Models\Subscribe;
use Illuminate\Support\Facades\Schema;

class SubscribeRepository
{

	/**
	 * Returns all Subscribes
	 *
	 * @return \Illuminate\Database\Eloquent\Collection|static[]
	 */
	public function all()
	{
		return Subscribe::all();
	}

	public function search($input)
    {
        $query = Subscribe::query();

        $columns = Schema::getColumnListing('subscribes');
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
	 * Stores Subscribe into database
	 *
	 * @param array $input
	 *
	 * @return Subscribe
	 */
	public function store($input)
	{
		return Subscribe::create($input);
	}

	/**
	 * Find Subscribe by given id
	 *
	 * @param int $id
	 *
	 * @return \Illuminate\Support\Collection|null|static|Subscribe
	 */
	public function findSubscribeById($id)
	{
		return Subscribe::find($id);
	}

	/**
	 * Updates Subscribe into database
	 *
	 * @param Subscribe $subscribe
	 * @param array $input
	 *
	 * @return Subscribe
	 */
	public function update($subscribe, $input)
	{
		$subscribe->fill($input);
		$subscribe->save();

		return $subscribe;
	}
}
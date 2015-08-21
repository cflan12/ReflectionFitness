<?php

namespace App\Libraries\Repositories;


use App\Models\WorkoutProgram;
use Illuminate\Support\Facades\Schema;

class WorkoutProgramRepository
{

	/**
	 * Returns all WorkoutPrograms
	 *
	 * @return \Illuminate\Database\Eloquent\Collection|static[]
	 */
	public function all()
	{
		return WorkoutProgram::all();
	}

	public function search($input)
    {
        $query = WorkoutProgram::query();

        $columns = Schema::getColumnListing('workout_programs');
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
	 * Stores WorkoutProgram into database
	 *
	 * @param array $input
	 *
	 * @return WorkoutProgram
	 */
	public function store($input)
	{
		return WorkoutProgram::create($input);
	}

	/**
	 * Find WorkoutProgram by given id
	 *
	 * @param int $id
	 *
	 * @return \Illuminate\Support\Collection|null|static|WorkoutProgram
	 */
	public function findWorkoutProgramById($id)
	{
		return WorkoutProgram::find($id);
	}

	/**
	 * Updates WorkoutProgram into database
	 *
	 * @param WorkoutProgram $workoutProgram
	 * @param array $input
	 *
	 * @return WorkoutProgram
	 */
	public function update($workoutProgram, $input)
	{
		$workoutProgram->fill($input);
		$workoutProgram->save();

		return $workoutProgram;
	}
}
<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Mitul\Controller\AppBaseController;
use Mitul\Generator\Utils\ResponseManager;
use Response;

class ExerciseAPIController extends AppBaseController
{

	/**
	 * Display a listing of the Exercise.
	 *
	 * @return Response
	 */
	public function index()
	{
		$exercises = Exercise::all();

		return $exercises->toArray();

		//return Response::json(ResponseManager::makeResult($exercises->toArray(), "Exercises retrieved successfully."));
	}

	/**
	 * Show the form for creating a new Exercise.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created Exercise in storage.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		if(sizeof(Exercise::$rules) > 0)
            $this->validateRequest($request, Exercise::$rules);

        $input = $request->all();

		$exercise = Exercise::create($input);

		return Response::json(ResponseManager::makeResult($exercise->toArray(), "Exercise saved successfully."));
	}

	/**
	 * Display the specified Exercise.
	 *
	 * @param  int  $id
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function show($id)
	{
		/** @var Exercise $exercise */
		$exercise = Exercise::find($id);

		if(empty($exercise))
			$this->throwRecordNotFoundException("Exercise not found", ERROR_CODE_RECORD_NOT_FOUND);

		return Response::json(ResponseManager::makeResult($exercise->toArray(), "Exercise retrieved successfully."));
	}

	/**
	 * Show the form for editing the specified Exercise.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified Exercise in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		/** @var Exercise $exercise */
		$exercise = Exercise::find($id);

		if(empty($exercise))
			$this->throwRecordNotFoundException("Exercise not found", ERROR_CODE_RECORD_NOT_FOUND);

		$input = $request->all();

		$exercise->fill($input);
		$exercise->save();

		return Response::json(ResponseManager::makeResult($exercise->toArray(), "Exercise updated successfully."));
	}

	/**
	 * Remove the specified Exercise from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		/** @var Exercise $exercise */
		$exercise = Exercise::find($id);

		if(empty($exercise))
			$this->throwRecordNotFoundException("Exercise not found", ERROR_CODE_RECORD_NOT_FOUND);

		$exercise->delete();

		return Response::json(ResponseManager::makeResult($id, "Exercise deleted successfully."));
	}

}

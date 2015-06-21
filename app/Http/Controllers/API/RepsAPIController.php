<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Models\Reps;
use Illuminate\Http\Request;
use Mitul\Controller\AppBaseController;
use Mitul\Generator\Utils\ResponseManager;
use Response;

class RepsAPIController extends AppBaseController
{

	/**
	 * Display a listing of the Reps.
	 *
	 * @return Response
	 */
	public function index()
	{
		$reps = Reps::all();

		return $reps->toArray();

		//return Response::json(ResponseManager::makeResult($reps, "Reps retrieved successfully."));
	}

	/**
	 * Show the form for creating a new Reps.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created Reps in storage.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		if(sizeof(Reps::$rules) > 0)
            $this->validateRequest($request, Reps::$rules);

        $input = $request->all();

		$reps = Reps::create($input);

		return Response::json(ResponseManager::makeResult($reps->toArray(), "Reps saved successfully."));
	}

	/**
	 * Display the specified Reps.
	 *
	 * @param  int  $id
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function show($id)
	{
		/** @var Reps $reps */
		$reps = Reps::find($id);

		if(empty($reps))
			$this->throwRecordNotFoundException("Reps not found", ERROR_CODE_RECORD_NOT_FOUND);

		return Response::json(ResponseManager::makeResult($reps->toArray(), "Reps retrieved successfully."));
	}

	/**
	 * Show the form for editing the specified Reps.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified Reps in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		/** @var Reps $reps */
		$reps = Reps::find($id);

		if(empty($reps))
			$this->throwRecordNotFoundException("Reps not found", ERROR_CODE_RECORD_NOT_FOUND);

		$input = $request->all();

		$reps->fill($input);
		$reps->save();

		return Response::json(ResponseManager::makeResult($reps->toArray(), "Reps updated successfully."));
	}

	/**
	 * Remove the specified Reps from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		/** @var Reps $reps */
		$reps = Reps::find($id);

		if(empty($reps))
			$this->throwRecordNotFoundException("Reps not found", ERROR_CODE_RECORD_NOT_FOUND);

		$reps->delete();

		return Response::json(ResponseManager::makeResult($id, "Reps deleted successfully."));
	}

}

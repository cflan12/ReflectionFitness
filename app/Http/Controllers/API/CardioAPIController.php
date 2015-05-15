<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Models\Cardio;
use Illuminate\Http\Request;
use Mitul\Controller\AppBaseController;
use Mitul\Generator\Utils\ResponseManager;
use Response;

class CardioAPIController extends AppBaseController
{

	/**
	 * Display a listing of the Cardio.
	 *
	 * @return Response
	 */
	public function index()
	{
		$cardios = Cardio::all();

		return Response::json(ResponseManager::makeResult($cardios->toArray(), "Cardios retrieved successfully."));
	}

	/**
	 * Show the form for creating a new Cardio.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created Cardio in storage.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		if(sizeof(Cardio::$rules) > 0)
            $this->validateRequest($request, Cardio::$rules);

        $input = $request->all();

		$cardio = Cardio::create($input);

		return Response::json(ResponseManager::makeResult($cardio->toArray(), "Cardio saved successfully."));
	}

	/**
	 * Display the specified Cardio.
	 *
	 * @param  int  $id
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function show($id)
	{
		/** @var Cardio $cardio */
		$cardio = Cardio::find($id);

		if(empty($cardio))
			$this->throwRecordNotFoundException("Cardio not found", ERROR_CODE_RECORD_NOT_FOUND);

		return Response::json(ResponseManager::makeResult($cardio->toArray(), "Cardio retrieved successfully."));
	}

	/**
	 * Show the form for editing the specified Cardio.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified Cardio in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		/** @var Cardio $cardio */
		$cardio = Cardio::find($id);

		if(empty($cardio))
			$this->throwRecordNotFoundException("Cardio not found", ERROR_CODE_RECORD_NOT_FOUND);

		$input = $request->all();

		$cardio->fill($input);
		$cardio->save();

		return Response::json(ResponseManager::makeResult($cardio->toArray(), "Cardio updated successfully."));
	}

	/**
	 * Remove the specified Cardio from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		/** @var Cardio $cardio */
		$cardio = Cardio::find($id);

		if(empty($cardio))
			$this->throwRecordNotFoundException("Cardio not found", ERROR_CODE_RECORD_NOT_FOUND);

		$cardio->delete();

		return Response::json(ResponseManager::makeResult($id, "Cardio deleted successfully."));
	}

}

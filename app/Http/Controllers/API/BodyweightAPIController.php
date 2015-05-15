<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Models\Bodyweight;
use Illuminate\Http\Request;
use Mitul\Controller\AppBaseController;
use Mitul\Generator\Utils\ResponseManager;
use Response;

class BodyweightAPIController extends AppBaseController
{

	/**
	 * Display a listing of the Bodyweight.
	 *
	 * @return Response
	 */
	public function index()
	{
		$bodyweights = Bodyweight::all();

		return Response::json(ResponseManager::makeResult($bodyweights->toArray(), "Bodyweights retrieved successfully."));
	}

	/**
	 * Show the form for creating a new Bodyweight.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created Bodyweight in storage.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		if(sizeof(Bodyweight::$rules) > 0)
            $this->validateRequest($request, Bodyweight::$rules);

        $input = $request->all();

		$bodyweight = Bodyweight::create($input);

		return Response::json(ResponseManager::makeResult($bodyweight->toArray(), "Bodyweight saved successfully."));
	}

	/**
	 * Display the specified Bodyweight.
	 *
	 * @param  int  $id
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function show($id)
	{
		/** @var Bodyweight $bodyweight */
		$bodyweight = Bodyweight::find($id);

		if(empty($bodyweight))
			$this->throwRecordNotFoundException("Bodyweight not found", ERROR_CODE_RECORD_NOT_FOUND);

		return Response::json(ResponseManager::makeResult($bodyweight->toArray(), "Bodyweight retrieved successfully."));
	}

	/**
	 * Show the form for editing the specified Bodyweight.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified Bodyweight in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		/** @var Bodyweight $bodyweight */
		$bodyweight = Bodyweight::find($id);

		if(empty($bodyweight))
			$this->throwRecordNotFoundException("Bodyweight not found", ERROR_CODE_RECORD_NOT_FOUND);

		$input = $request->all();

		$bodyweight->fill($input);
		$bodyweight->save();

		return Response::json(ResponseManager::makeResult($bodyweight->toArray(), "Bodyweight updated successfully."));
	}

	/**
	 * Remove the specified Bodyweight from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		/** @var Bodyweight $bodyweight */
		$bodyweight = Bodyweight::find($id);

		if(empty($bodyweight))
			$this->throwRecordNotFoundException("Bodyweight not found", ERROR_CODE_RECORD_NOT_FOUND);

		$bodyweight->delete();

		return Response::json(ResponseManager::makeResult($id, "Bodyweight deleted successfully."));
	}

}

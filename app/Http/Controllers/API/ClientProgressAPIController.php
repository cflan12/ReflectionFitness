<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use Mitul\Controller\AppBaseController;
use Mitul\Generator\Utils\ResponseManager;
use App\Models\ClientProgress;
use Illuminate\Http\Request;
use App\Libraries\Repositories\ClientProgressRepository;
use Response;
use Schema;

class ClientProgressAPIController extends AppBaseController
{

	/** @var  ClientProgressRepository */
	private $clientProgressRepository;

	function __construct(ClientProgressRepository $clientProgressRepo)
	{
		$this->clientProgressRepository = $clientProgressRepo;
	}

	/**
	 * Display a listing of the ClientProgress.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{
	    $input = $request->all();

		$result = $this->clientProgressRepository->search($input);

		$clientProgresses = $result[0];

		return Response::json(ResponseManager::makeResult($clientProgresses->toArray(), "ClientProgresses retrieved successfully."));
	}

	public function search($input)
    {
        $query = ClientProgress::query();

        $columns = Schema::getColumnListing('$TABLE_NAME$');
        $attributes = array();

        foreach($columns as $attribute)
        {
            if(isset($input[$attribute]))
            {
                $query->where($attribute, $input[$attribute]);
            }
        }

        return $query->get();
    }

	/**
	 * Show the form for creating a new ClientProgress.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created ClientProgress in storage.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{	
		// Rule from API generator is stored incorrectly with rules
		// but was changed before database migration
		
		/*if(sizeof(ClientProgress::$rules) > 0)
            $this->validateRequest($request, ClientProgress::$rules); */

        $input = $request->all();

		$clientProgress = $this->clientProgressRepository->store($input);

		return Response::json(ResponseManager::makeResult($clientProgress->toArray(), "ClientProgress saved successfully."));
	}

	/**
	 * Display the specified ClientProgress.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function show($id)
	{
		$clientProgress = $this->clientProgressRepository->findClientProgressById($id);

		if(empty($clientProgress))
			$this->throwRecordNotFoundException("ClientProgress not found", ERROR_CODE_RECORD_NOT_FOUND);

		return Response::json(ResponseManager::makeResult($clientProgress->toArray(), "ClientProgress retrieved successfully."));
	}

	/**
	 * Show the form for editing the specified ClientProgress.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified ClientProgress in storage.
	 *
	 * @param  int    $id
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		$clientProgress = $this->clientProgressRepository->findClientProgressById($id);

		if(empty($clientProgress))
			$this->throwRecordNotFoundException("ClientProgress not found", ERROR_CODE_RECORD_NOT_FOUND);

		$input = $request->all();

		$clientProgress = $this->clientProgressRepository->update($clientProgress, $input);

		return Response::json(ResponseManager::makeResult($clientProgress->toArray(), "ClientProgress updated successfully."));
	}

	/**
	 * Remove the specified ClientProgress from storage.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function destroy($id)
	{
		$clientProgress = $this->clientProgressRepository->findClientProgressById($id);

		if(empty($clientProgress))
			$this->throwRecordNotFoundException("ClientProgress not found", ERROR_CODE_RECORD_NOT_FOUND);

		$clientProgress->delete();

		return Response::json(ResponseManager::makeResult($id, "ClientProgress deleted successfully."));
	}
}

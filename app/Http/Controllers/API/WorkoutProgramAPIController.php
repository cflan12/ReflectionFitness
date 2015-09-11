<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use Mitul\Controller\AppBaseController;
use Mitul\Generator\Utils\ResponseManager;
use App\Models\WorkoutProgram;
use Illuminate\Http\Request;
use App\Libraries\Repositories\WorkoutProgramRepository;
use Response;
use Schema;

class WorkoutProgramAPIController extends AppBaseController
{

	/** @var  WorkoutProgramRepository */
	private $workoutProgramRepository;

	function __construct(WorkoutProgramRepository $workoutProgramRepo)
	{
		$this->workoutProgramRepository = $workoutProgramRepo;
	}

	/**
	 * Display a listing of the WorkoutProgram.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{
	    $input = $request->all();

		$result = $this->workoutProgramRepository->search($input);

		$workoutPrograms = $result[0];

		return Response::json(ResponseManager::makeResult($workoutPrograms->toArray(), "WorkoutPrograms retrieved successfully."));
	}

	public function search($input)
    {
        $query = WorkoutProgram::query();

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
	 * Show the form for creating a new WorkoutProgram.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created WorkoutProgram in storage.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		/* if(sizeof(WorkoutProgram::$rules) > 0)
            $this->validateRequest($request, WorkoutProgram::$rules); */

        $input = $request->all();

		$workoutProgram = $this->workoutProgramRepository->store($input);

		return Response::json(ResponseManager::makeResult($workoutProgram->toArray(), "WorkoutProgram saved successfully."));
	}

	/**
	 * Display the specified WorkoutProgram.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function show($id)
	{
		$workoutProgram = $this->workoutProgramRepository->findWorkoutProgramById($id);

		if(empty($workoutProgram))
			$this->throwRecordNotFoundException("WorkoutProgram not found", ERROR_CODE_RECORD_NOT_FOUND);

		return Response::json(ResponseManager::makeResult($workoutProgram->toArray(), "WorkoutProgram retrieved successfully."));
	}

	/**
	 * Show the form for editing the specified WorkoutProgram.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified WorkoutProgram in storage.
	 *
	 * @param  int    $id
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		$workoutProgram = $this->workoutProgramRepository->findWorkoutProgramById($id);

		if(empty($workoutProgram))
			$this->throwRecordNotFoundException("WorkoutProgram not found", ERROR_CODE_RECORD_NOT_FOUND);

		$input = $request->all();

		$workoutProgram = $this->workoutProgramRepository->update($workoutProgram, $input);

		return Response::json(ResponseManager::makeResult($workoutProgram->toArray(), "WorkoutProgram updated successfully."));
	}

	/**
	 * Remove the specified WorkoutProgram from storage.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function destroy($id)
	{
		$workoutProgram = $this->workoutProgramRepository->findWorkoutProgramById($id);

		if(empty($workoutProgram))
			$this->throwRecordNotFoundException("WorkoutProgram not found", ERROR_CODE_RECORD_NOT_FOUND);

		$workoutProgram->delete();

		return Response::json(ResponseManager::makeResult($id, "WorkoutProgram deleted successfully."));
	}
}

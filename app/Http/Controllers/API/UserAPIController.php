<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Models\User;
use Illuminate\Http\Request;
use Mitul\Controller\AppBaseController;
use Mitul\Generator\Utils\ResponseManager;
use Response;

class UserAPIController extends AppBaseController
{

	/**
	 * Display a listing of the Users.
	 *
	 * @return Response
	 */
	public function index()
	{
		$users = User::all();

		return Response::json(ResponseManager::makeResult($users->toArray(), "Reps retrieved successfully."));
	}

	/**
	 * Show the form for creating a new Users.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created User in storage.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		if(sizeof(User::$rules) > 0)
            $this->validateRequest($request, User::$rules);

        $input = $request->all();

		$users = User::create($input);

		return Response::json(ResponseManager::makeResult($users->toArray(), "Users saved successfully."));
	}

	/**
	 * Display the specified Users.
	 *
	 * @param  int  $id
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function show($id)
	{
		/** @var Reps $reps */
		$users = User::find($id);

		if(empty($users))
			$this->throwRecordNotFoundException("Users not found", ERROR_CODE_RECORD_NOT_FOUND);

		return Response::json(ResponseManager::makeResult($users->toArray(), "Users retrieved successfully."));
	}

	/**
	 * Show the form for editing the specified Users.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified Users in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		/** @var Reps $reps */
		$user = User::find($id);

		if(empty($user))
			$this->throwRecordNotFoundException("User not found", ERROR_CODE_RECORD_NOT_FOUND);

		$input = $request->all();

		$user->fill($input);
		$user->save();

		return Response::json(ResponseManager::makeResult($user->toArray(), "User updated successfully."));
	}

	/**
	 * Remove the specified User from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		/** @var Reps $reps */
		$user = User::find($id);

		if(empty($user))
			$this->throwRecordNotFoundException("User not found", ERROR_CODE_RECORD_NOT_FOUND);

		$user->delete();

		return Response::json(ResponseManager::makeResult($id, "User deleted successfully."));
	}

}

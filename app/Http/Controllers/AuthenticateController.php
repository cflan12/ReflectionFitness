<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use JWTAuth;
use Tymon\JWTAuth\Execeptions\JWTException;

class AuthenticateController extends Controller {

	public function __construct()
	{
		// Apply the jwt.auth middleware to all methods in the controller
		// except for th authenticate method. We don't want to prevent the
		// user from retrieving their token if they don't already have it.
		$this->middleware('jwt.auth', ['except' => ['authenticate']]);
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//Show users
		$users = User::all();
		return $users;
	}

	/**
	 *
	 *
	 *
	 */
	public function authenticate(Request $request)
	{
		$credentials = $request->only('email', 'password');

		try {
			// Verify the credentials and create a token for the user
			if(!$token = JWTAuth::attempt($credentials)) {
				return response()->json(['error' =>'invalid_credentials'], 401);
			}
		} catch (JWTException $e) {
			//catch something went wrong
			return response()->json(['error' => 'could_not_create_token'], 500);
		}

		//if no errors are encountered we can return a JWT to send to the client
		return response()->json(compact('token'));
	}	

}

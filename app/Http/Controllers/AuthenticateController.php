<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use JWTAuth;
use Tymon\JWTAuth\Execeptions\JWTException;

class AuthenticateController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//Show users
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
			//verify the credentials and create a token for the user
			if(! $token = JWTAuth::attempt($credentials)) {
				return response()->json(['error' =>'invalid_credentials'], 401);
			}
		} catch(JWTException $e) {
			//catch something went wrong
			return response()->json(['error' => 'could_not_create_token'], 500);
		}

		//if no errors are encountered we can return a JWT
		return response()->json(compact('token'));
	}	
	
}

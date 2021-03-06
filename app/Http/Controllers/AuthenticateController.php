<?php namespace App\Http\Controllers;

use App\Http\Requests;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use JWTAuth;
use Tymon\JWTAuth\Execeptions\JWTException;

use App\Models\User;


class AuthenticateController extends Controller {

	
	public function __construct()
	{
		// Apply the jwt.auth middleware to all methods in the controller
		// except for the authenticate method. We don't want to prevent the
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
		//Show users from User model
		$users = User::all();
		return $users;
	}

	/**
	 *
	 * Create JWT with user authentication from client and return
	 * JWT to the client
	 */
	public function authenticate(Request $request)
	{
		$credentials = $request->only('email', 'password');

		try {
			// Verify the credentials and return error if false
			if(! $token = JWTAuth::attempt($credentials)) {
				return response()->json(['error' =>'invalid_credentials'], 401);
			}
			
		} catch (JWTException $e) {
			//catch something went wrong
			return response()->json(['error' => 'could_not_create_token'], 500);
		}

		//if no errors are encountered we can return a JWT to the client
		return response()->json(compact('token'));
	}

	/**
	 *	
	 * Return an object of the current authenticated user
	 *
	 */

	public function getAuthenticatedUser() 
	{
		try {
				if(! $user = JWTAuth::parseToken()->authenticate()) {
				return response()->json(['user_not_found'], 404);
			}
		} catch(Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

			return response()->json(['token_expired'], $e->getStatusCode());
		
		} catch(Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

			return response()->json(['token_invalid'], $e->getStatusCode());
		
		} catch(Tymon\JWTAuth\Exceptions\JWTException $e) {

			return response()->json(['token_absent'], $e->getStatusCode());
		}

		// the token is valid and we have found the user via the sub claim
		return response()->json(compact('user'));


	}
}

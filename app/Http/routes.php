<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function()
	{
		return view('index');
	});

//Route::controllers([
//	'auth' => 'Auth\AuthController',
//	'password' => 'Auth\PasswordController',
//]);

// Test JWT Authorization
Route::get('test', function() {
	$token = JWTAuth::parseToken('bearer', 'HTTP_AUTHORIZATION')->getToken();
	dd($token);
});

//Authentication 
Route::group(['prefix' => 'api'], function() 
{
	Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
	Route::post('authenticate', 'AuthenticateController@authenticate');
	Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
	Route::resource('subscription', 'SubscriptionController');
	Route::post('subscription', 'SubscriptionController@store');
});


// Protect routes with middleware for authenticated JWT
Route::resource('api/exercises', 'API\ExerciseAPIController');
Route::resource('api/bodyweights', 'API\BodyweightAPIController');
Route::resource('api/cardios', 'API\CardioAPIController');
Route::resource('api/reps', 'API\RepsAPIController');
Route::resource('api/users', 'API\UserAPIController'); 
Route::resource('api/workoutPrograms', 'API\WorkoutProgramAPIController');
Route::resource('api/clientProgress', 'API\ClientProgressAPIController');
//Route::resource('api/subscribe', 'API\SubscribeAPIController');

//Consultation Form
Route::post('submitConsultationForm', 'MailController@submitConsultationForm');
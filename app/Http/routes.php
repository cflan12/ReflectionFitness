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

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);


Route::resource('api/exercises', 'API\ExerciseAPIController');

Route::resource('api/bodyweights', 'API\BodyweightAPIController');

Route::resource('api/cardios', 'API\CardioAPIController');

Route::resource('api/reps', 'API\RepsAPIController');

//Protect route
Route::resource('api/users', 'API\UserAPIController');
<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Http\Request;

class Subscription extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
			try {

			dd($request);
			echo('request echo');
			echo($request);
			/*
			$user = new User;
			$user->name = $request.name;
			$user->email = $request.email;
			$user->password = $request.password;
			$user->subscriber = true;
			$user->role = 'client';
			$user->save();

			$user->charge(100, [
				'source' => $request.token]);
			*/
			

			/*
  			\Stripe\Charge::create(array(
  				"amount" => 400,
  				"currency" => "usd",
  				"source" => $request, //from angular stripe-payments
  				"description" => "Reflection Fitness Subscription"
  			)); 
  			*/

  			print('API Charge successful');

		} catch(\Stripe\Error\Card $e) {
  			// Since it's a decline, \Stripe\Error\Card will be caught
  			$body = $e->getJsonBody();
  			$err  = $body['error'];

  			print('Status is:' . $e->getHttpStatus() . "\n");
  			print('Type is:' . $err['type'] . "\n");
  			print('Code is:' . $err['code'] . "\n");
  			// param is '' in this case
  			print('Param is:' . $err['param'] . "\n");
  			print('Message is:' . $err['message'] . "\n");
		} catch (\Stripe\Error\RateLimit $e) {
  			// Too many requests made to the API too quickly
		} catch (\Stripe\Error\InvalidRequest $e) {
  		// Invalid parameters were supplied to Stripe's API
		} catch (\Stripe\Error\Authentication $e) {
  		// Authentication with Stripe's API failed
  		// (maybe you changed API keys recently)
		} catch (\Stripe\Error\ApiConnection $e) {
  		// Network communication with Stripe failed
		} catch (\Stripe\Error\Base $e) {
  		// Display a very generic error to the user, and maybe send
  		// yourself an email
		} catch (Exception $e) {
  		// Something else happened, completely unrelated to Stripe
		}

		/*
        $input = $request->all();

		$subscribe = $this->subscribeRepository->store($input); 

		return Response::json(ResponseManager::makeResult($subscribe->toArray(), "Subscribe saved successfully.")); */
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}

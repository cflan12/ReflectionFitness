<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use Mitul\Controller\AppBaseController;
use Mitul\Generator\Utils\ResponseManager;
use App\Models\Subscribe;
use Illuminate\Http\Request;
use App\Libraries\Repositories\SubscribeRepository;
use Response;
use Schema;
use stripe;

\Stripe\Stripe::setApiKey("sk_test_0b10IIKg8JxLIW1JWuC0qsWS");

class SubscribeAPIController extends AppBaseController
{

	/** @var  SubscribeRepository */
	private $subscribeRepository;

	function __construct(SubscribeRepository $subscribeRepo)
	{
		$this->subscribeRepository = $subscribeRepo;
	}

	/**
	 * Display a listing of the Subscribe.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{
	    $input = $request->all();

		$result = $this->subscribeRepository->search($input);

		$subscribes = $result[0];

		return Response::json(ResponseManager::makeResult($subscribes->toArray(), "Subscribes retrieved successfully."));
	}

	public function search($input)
    {
        $query = Subscribe::query();

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
	 * Show the form for creating a new Subscribe.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created Subscribe in storage.
	 *
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{

		try {

  			\Stripe\Charge::create(array(
  				"amount" => 400,
  				"currency" => "usd",
  				"source" => $request, //from angular stripe-payments
  				"description" => "Reflection Fitness Subscription"
  			));

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
	 * Display the specified Subscribe.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function show($id)
	{
		$subscribe = $this->subscribeRepository->findSubscribeById($id);

		if(empty($subscribe))
			$this->throwRecordNotFoundException("Subscribe not found", ERROR_CODE_RECORD_NOT_FOUND);

		return Response::json(ResponseManager::makeResult($subscribe->toArray(), "Subscribe retrieved successfully."));
	}

	/**
	 * Show the form for editing the specified Subscribe.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified Subscribe in storage.
	 *
	 * @param  int    $id
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function update($id, Request $request)
	{
		$subscribe = $this->subscribeRepository->findSubscribeById($id);

		if(empty($subscribe))
			$this->throwRecordNotFoundException("Subscribe not found", ERROR_CODE_RECORD_NOT_FOUND);

		$input = $request->all();

		$subscribe = $this->subscribeRepository->update($subscribe, $input);

		return Response::json(ResponseManager::makeResult($subscribe->toArray(), "Subscribe updated successfully."));
	}

	/**
	 * Remove the specified Subscribe from storage.
	 *
	 * @param  int $id
	 *
	 * @return Response
	 */
	public function destroy($id)
	{
		$subscribe = $this->subscribeRepository->findSubscribeById($id);

		if(empty($subscribe))
			$this->throwRecordNotFoundException("Subscribe not found", ERROR_CODE_RECORD_NOT_FOUND);

		$subscribe->delete();

		return Response::json(ResponseManager::makeResult($id, "Subscribe deleted successfully."));
	}
}

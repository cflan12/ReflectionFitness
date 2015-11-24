<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class ContactFormController extends Controller {

	public function submitConsultationForm() 
	{
		$formData = file_get_contents('php://input', true);
		$data = json_decode($formData);
		$email = $data->email;

		Mail::raw('Text to e-mail', function($message)
		{
			$message->from($email, 'Consultation Request');

			$message->to('cflan12@gmail.com');
		});
      }
 }
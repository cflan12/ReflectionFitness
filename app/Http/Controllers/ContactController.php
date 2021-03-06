<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

//Mandrill 
use Mail;


class ContactController extends Controller {

	public function submitConsultationForm() 
	{
		$formData = file_get_contents('php://input', true);
		$data = json_decode($formData);
		$email = $data->email;

		Mail::raw('Reflection Fitness Free Consultation Request from: ' . $email, function($message)
		{
			$message->from('Jared@ReflectionFitness.com', 'Reflection Fitness Consultation Request');

			$message->to('cflan12@gmail.com')->subject('Reflection Fitness Consultation Form');
		});
      }

 }
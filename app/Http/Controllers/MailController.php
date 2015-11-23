<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class MailController extends Controller {

	public function submitConsultationForm() {

		$response = array( 'success' => false );
		$formData = file_get_contents('php://input');
		$data = json_decode($formData);
		$email = $data->email;

		$mailTo = 'cflan12@gmail.com';
		$subject = 'Reflection Fitness Free Consultation Submission';
		$body = $email . 'has requested a free consultation from Reflection Fitness.';

		$success = mail($mailTo, $subject, $body);

			if(success) {
				$response['success'] = true;
			}
		}

		echo json_encode($response);
	}

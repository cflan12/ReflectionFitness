<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Newsletter;

class NewsletterController extends Controller {

    public function addEmailToList() 
    {
        try {

            $formData = file_get_contents('php://input', true);
            $data = json_decode($formData);
            $email = $data->email;

            Newsletter::subscribe($email,[],'2ddc78feff');

        } catch (\Mailchimp_List_AlreadySubscribed $e) {
            // do something
            echo $e;
        } catch (\Mailchimp_Error $e) {
            // do something
            echo $e;
        }
    }
}
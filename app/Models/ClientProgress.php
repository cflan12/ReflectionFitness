<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientProgress extends Model
{
    
	public $table = "client_progress";

	public $primaryKey = "id";
    
	public $timestamps = true;

	public $fillable = [
	    "client_id",
		"date",
		"workout_progress",
	];

	public static $rules = [
	    "integer" => "required",
		"date" => "required"
	];

	// show relationship to user table

	// script with Carbon to inset new column given time frame

}

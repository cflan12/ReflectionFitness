<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reps extends Model
{
    
	public $table = "reps";

	public $primaryKey = "id";
    
	public $timestamps = true;

	public $fillable = [
	    "range",
		"timeframe"
	];

	public static $rules = [
	    "timeframe" => "rest_time"
	];

}

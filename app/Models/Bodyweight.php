<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bodyweight extends Model
{
    
	public $table = "bodyweights";

	public $primaryKey = "id";
    
	public $timestamps = true;

	public $fillable = [
	    "body",
		"exercise"
	];

	public static $rules = [
	    
	];

}

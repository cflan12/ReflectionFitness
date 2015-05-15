<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cardio extends Model
{
    
	public $table = "cardios";

	public $primaryKey = "id";
    
	public $timestamps = true;

	public $fillable = [
	    "type",
		"exercise"
	];

	public static $rules = [
	    
	];

}

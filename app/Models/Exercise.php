<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    
	public $table = "exercises";

	public $primaryKey = "id";
    
	public $timestamps = true;

	public $fillable = [
	    "body",
		"exercise"
	];

	public static $rules = [
	    
	];

}

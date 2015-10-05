<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscribe extends Model
{
    
	public $table = "subscribes";

	public $primaryKey = "id";
    
	public $timestamps = true;

	public $fillable = [
	    "first_name",
		"last_name",
		"token"
	];

	public static $rules = [
	    
	];

}

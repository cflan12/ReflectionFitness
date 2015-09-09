<?php namespace App\Models;

use Carbon\Carbon;
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

	// current table uses client_id as a foreign key, show relationship

	public function client()
	{
		return $this->belongsTo('App\Models\User');
	}

	/*
	// Carbon date accessors
	protected $dates = ['date'];

	//returns Carbon object at timezone
	public function setDateAttribute($date)
	{
		$this->attributes['date'] = Carbon::parse($date);
	} */
	
	


}

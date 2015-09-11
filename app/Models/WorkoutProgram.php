<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutProgram extends Model
{
    
	public $table = "workout_programs";

	public $primaryKey = "id";
    
	public $timestamps = true;

	public $fillable = [
	    "workout", "name", "goal", "weeks", "frequency"
	];

	public static $rules = [
	    
	];

}

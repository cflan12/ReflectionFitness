<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeyToUsersWorkoutProgram extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('users', function(Blueprint $table) 
		{
			$table->integer('user_workout')->unsigned()->nullable()->after('subscriber'); // auto incremented integer as foreign key reference
			$table->foreign('user_workout')->references('id')->on('workout_programs')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('users', function(Blueprint $table)
		{
			$table->dropForeign('users_user_workout_foreign');
		});
	}

}

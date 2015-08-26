<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUniqueForWorkoutProgramsName extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('workout_programs', function(Blueprint $table) {
			$table->string('name')->unique()->change();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('workout_programs', function(Blueprint $table) {
			$table->dropColumn('name');
		});
	}

}

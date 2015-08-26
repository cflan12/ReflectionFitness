<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToWorkoutTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('workout_programs', function(Blueprint $table) {
			$table->string('name')->after('workout');
			$table->string('goal')->after('name');
			$table->string('weeks')->after('goal');
			$table->string('frequency')->after('weeks');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::talbe('workout_programs', function(Blueprint $table) {
			$table->dropColumn('name');
			$table->dropColumn('goal');
			$table->dropColumn('weeks');
			$table->dropColumn('frequency');
		});
	}

}

<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
//use database\seeds\exerciseSeeder;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		// $this->call('UserTableSeeder');
		//$this->call('exerciseSeeder');
		//$this->call('UserSeeder');
		//$this->call('RepSeeder');
		//$this->call('CardioSeeder');
		//$this->call('BodyweightSeeder');
	}

}

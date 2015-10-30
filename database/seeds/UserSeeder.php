<?php

use Illuminate\Database\Seeder;
use App\Models\User;

	class UserSeeder extends Seeder {

		public function run()
		{	
			$Faker = Faker\Factory::create();

			for($i=0; $i < 10; ++$i)
			{
				$user = new User;
				$user->name = $Faker->name;
				$user->email = $Faker->email;
				$user->password = '1234'; //Hash::make('1234');
				$user->subscriber = 1;
				$user->role = 'client';
				$user->save();
			}

				//admin user
				$user = new User;
				$user->name = $Faker->name;
				$user->email = $Faker->email;
				$user->password = '1234';
				$user->subscriber = 1;
				$user->role = 'admin';
				$user->save();
		}
	}
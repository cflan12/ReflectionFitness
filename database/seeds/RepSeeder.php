<?php 

use Illuminate\Database\Seeder;
Use App\Models\Reps;

	class RepSeeder extends Seeder {

		public function run()
		{
			$reps = array(
				['range' => '1 - 3', 'time_frame' => '30 seconds', 'rest_time' => '60 seconds'],
				['range' => '4 - 6', 'time_frame' => '45 seconds', 'rest_time' => '60 - 90 seconds'],
				['range' => '6 - 8', 'time_frame' => '60 seconds', 'rest_time' => '1 - 2 minutes'],
				['range' => '8 - 10', 'time_frame' => '10 minutes', 'rest_time' => '2 -3 minutes'],
				['range' => '10 - 15', 'time_frame' => '15 minutes', 'rest_time' => '3 - 5 minutes'],
				['range' => '20', 'time_frame' => '20 minutes', 'rest_time' => '3 -5 minutes'],
				['range' => '25', 'time_frame' => '25 minutes', 'rest_time' => '3 -5 minutes'],
				['range' => '30', 'time_frame' => '30 minutes', 'rest_time' => '3 -5 minutes'],
				['range' => '50', 'time_frame' => '30 minutes', 'rest_time' => '3 - 5 minutes']
			);

			foreach($reps as $rep)
			{
				Reps::create($rep);
			}
		}
	}
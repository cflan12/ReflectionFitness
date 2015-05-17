<?php 

use Illuminate\Database\Seeder;
Use App\Models\Cardio;

	class CardioSeeder extends Seeder {

		public function run()
		{
			$cardios = array(
				['type' => 'HIIT', 'exercise' => '20 Minutes HIIT on Bicycle (1min 30 sec steady pace, 30 sec all out pace)'],
				['type' => 'HIIT', 'exercise' => '21 Minutes HIIT on Bicycle (1min steady pace, 30 sec all out pace)'],
				['type' => 'HIIT', 'exercise' => '21 Minutes HIIT on Treadmill or Outdoor (1min steady pace, 30 sec all out pace)'],
				['type' => 'HIIT', 'exercise' => '20 Minutes HIIT on Treadmill or Outdoor (1min 30 sec steady pace, 30 sec all out pace)'],
				['type' => 'HIIT', 'exercise' => '20 Minutes HIIT on Stairmaster (1min 30 sec steady pace, 30 sec all out pace)'],
				['type' => 'Steady Cardio', 'exercise' => '20 Minutes Stairmaster'],
				['type' => 'Steady Cardio', 'exercise' => '20 Minutes Bicycle'],
				['type' => 'Steady Cardio', 'exercise' => '20 minutes Treadmill'],
				['type' => 'Steady Cardio', 'exercise' => '30 Minute Walk/Jog'],
				['type' => 'Steady Cardio', 'exercise' => '30 minute Run']
			);

			foreach($cardios as $cardio)
			{
				Cardio::create($cardio);
			}
		}
	}
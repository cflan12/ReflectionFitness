<?php 

//use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
Use App\Models\Exercise;

	class exerciseSeeder extends Seeder {

		public function run()
		{
			$exercises = array(
				['body' => 'Chest', 'exercise' => 'Flat Bench Press Barbell'],
				['body' => 'Chest', 'exercise' => 'Incline Barbell Bench Press'],
			);

			foreach($exercises as $exercise)
			{
				Exercise::create($exercise);
			}
		}
	}
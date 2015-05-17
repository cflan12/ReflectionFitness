<?php 

use Illuminate\Database\Seeder;
Use App\Models\Bodyweight;

	class BodyweightSeeder extends Seeder {

		public function run()
		{
			$exercises = array(
				['body' => 'Upper Body', 'exercise' => 'Push Ups'],
				['body' => 'Upper Body', 'exercise' => 'Close grip push ups'],
				['body' => 'Upper Body', 'exercise' => 'Wide grip push ups'],
				['body' => 'Upper Body', 'exercise' => 'Spiderman push ups'],
				['body' => 'Upper Body', 'exercise' => 'Off Set Hand push ups'],
				['body' => 'Upper Body', 'exercise' => 'Incline push ups'],
				['body' => 'Upper Body', 'exercise' => 'T push ups'],
				['body' => 'Upper Body', 'exercise' => 'Plank'],
				['body' => 'Upper Body', 'exercise' => 'Plank Knee to elbows'],
				['body' => 'Upper Body', 'exercise' => 'Burpees'],
				['body' => 'Upper Body', 'exercise' => 'Clapping push ups'],
				['body' => 'Legs/Core', 'exercise' => 'Squats'],
				['body' => 'Legs/Core', 'exercise' => 'Prisoner Squats'],
				['body' => 'Legs/Core', 'exercise' => 'Lunge Squats'],
				['body' => 'Legs/Core', 'exercise' => 'Walking Lunges'],
				['body' => 'Legs/Core', 'exercise' => 'Calf Raises'],
				['body' => 'Legs/Core', 'exercise' => 'Single Leg Calf Raises'],
				['body' => 'Legs/Core', 'exercise' => 'Jump Squats'],
				['body' => 'Legs/Core', 'exercise' => 'Half Knees'],
				['body' => 'Legs/Core', 'exercise' => 'Single Leg Squat'],
				['body' => 'Legs/Core', 'exercise' => 'Half Burpees'],
				['body' => 'Legs/Core', 'exercise' => 'Plank Knee to elbows'],
				['body' => 'Legs/Core', 'exercise' => 'Air Bicycles'],
				['body' => 'Legs/Core', 'exercise' => 'Crunches'],
				['body' => 'Legs/Core', 'exercise' => 'Mountain Climbers'],
				['body' => 'Legs/Core', 'exercise' => 'Crossing Mountain Climbers'],
				['body' => 'Legs/Core', 'exercise' => 'Jumping Knee Tucks'],
				['body' => 'Legs/Core', 'exercise' => 'Laying Leg Raises'],
				['body' => 'Legs/Core', 'exercise' => 'Laying Knee Tucks'],
				['body' => 'Legs/Core', 'exercise' => 'Toe Touches']
			);
		
			foreach($exercises as $exercise)
			{
				Bodyweight::create($exercise);
			}

		}
	}
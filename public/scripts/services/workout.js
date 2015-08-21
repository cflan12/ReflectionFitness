
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('workout', workout);

		function workout($resource) {

			var Exercise = $resource('api/exercises/:id', {}, {
				update: {
					method: 'PUT'
				},
				'query': {
					method: 'GET',
					isArray: true,
				}
			});

			// $resource URL for workout programs API
			var Workout = $resource('api/workoutPrograms/:id', {}, {
				update: {
					method: 'PUT'
				},
				'query': {
					method: 'GET',
					isArray: true,
				}
			});


			//query API for exercises and return JSON object with get method
			function getExercises() {
				return Exercise.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			// save function called to POST data to API
			function saveWorkout(data) {
				return Workout.save(data).$promise.then(function(success) {
					console.log("success");
				}, function(error) {
					console.log("error");
				});
				
			}

			return {
				getExercises: getExercises,
				saveWorkout: saveWorkout
			}
		}
})();

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


			//query API for exercises and return JSON object with get method
			function getExercises() {
				return Exercise.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			function saveWorkout(data) {
				console.log(data);
			}

			return {
				getExercises: getExercises,
				saveWorkout: saveWorkout
			}
		}
})();
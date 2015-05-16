
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('workout', workout);

		function workout($resource) {

			var Exercise = $resource('api/exercises', {}, {
				update: {
					method: 'PUT'
				}
			});

			//query API for exercises and return JSON object with get method
			function getExercises() {
				return Exercise.get().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getExercises: getExercises
			}
		}
})();
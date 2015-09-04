
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('workout', workout);

		function workout($resource) {

			//weighted exercises URL
			var Exercise = $resource('api/exercises/:id', {}, {
				update: {
					method: 'PUT'
				},
				query: {
					method: 'GET',
					isArray: true,
				}
			});

			// $resource URL for workout programs API
			var Workout = $resource('api/workoutPrograms/:id', {}, {
				update: {
					method: 'PUT'
				},
				query: {
					method: 'GET',
					isArray: false,
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

			function deleteExercise(id) {
				return Exercise.delete({id:id}).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			function addExercise(data) {
				return Exercise.save(data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			function update(date) {
				return Exercise.update({id:data.id}, data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			// save function called to POST data to API
			function saveWorkout(data) {
				return Workout.save(data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			// return all workout plans from API index
			function getWorkouts() {
				return Workout.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			// return client workout to specific frontend client 
			// as $resource from API
			function clientWorkout(id) {
				return Workout.query({id:id}).$promise.then(function(result) {
					return result;
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getExercises: getExercises,
				deleteExercise: deleteExercise,
				addExercise: addExercise,
				update: update,
				saveWorkout: saveWorkout,
				getWorkouts: getWorkouts,
				clientWorkout: clientWorkout
			}
		}
})();
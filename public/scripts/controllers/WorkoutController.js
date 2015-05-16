//Define application controller for RESTful API ngResource

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('WorkoutController', WorkoutController);

		//injecting services into controller
		function WorkoutController(workout, $scope) {

			var vm = this;

			vm.exercises = [];

			//get exercises from DB
			getExercises();

			//return JSON object from API, array is result.data
			function getExercises() {
				workout.getExercises().then(function(result) {
					vm.exercises = result.data;
					console.log(vm.exercises);
				}, function(error) {
					console.log(error);
				});
			}
		}
})();
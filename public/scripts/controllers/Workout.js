//Define application controller for RESTful API ngResource

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('WorkoutController', Workout);

		//injecting services into controller
		function Workout(workout, $scope) {

			var vm = this;

			vm.exercises = [];

			function getExercises() {
				workout.getExercises().then(function(result) {
					vm.exercises = result;
					console.log(vm.exercises);
				}, function(error) {
					console.log(error);
				});
			}
		}
})();
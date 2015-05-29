//Define application controller for RESTful API ngResource

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('WorkoutController', WorkoutController);

		//injecting services into controller
		function WorkoutController(workout, users, bodyweight, rep, cardio, $scope) {

			var vm = this;

			vm.exercises = [];

			vm.subscribers = [];

			vm.paid = [];

			vm.exerciseBodyweight = [];

			vm.reps = [];

			vm.exerciseCardio = [];

			console.log("angular ui");
			console.log(vm.paid);
			//get JSON objects from DB
			getExercises();

			getUsers();

			getBodyweight();

			getReps();

			getCardio();

			//return JSON object from exercise API, array is result.data
			function getExercises() {
				workout.getExercises().then(function(result) {
					vm.exercises = result.data;
					console.log(vm.exercises);
				}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from user API and convert to an array
			function getUsers() {
				users.getUser().then(function(result) {
					vm.subscribers = result.data;
					console.log(vm.subscribers);
				}, function(error) {
					console.log(error);
				});
			}

			//log New User
			vm.logNewUser = function() {

				users.saveUser({
					"name":vm.full_name,
					"email":vm.email,
					"password":vm.password,
					"subscriber": 1
				}).then(function(success) {
					//refresh user list
					getUsers();
					console.log(success);
				}, function(error) {
					console.log(error);
				});

				getUsers();

				//Clear input fields
				vm.full_name = "";
				vm.email = "";
				vm.password = "";
			}

			//delete user
			vm.deleteUser = function(subscribers) {

				var id = subscribers.id;

				users.deleteUser(id).then(function(success) {
					getUsers();
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			//log New Workout
			vm.logWorkout = function() {

				workout.saveWorkout({
					"name":vm.workoutType,
					"identifier":vm.programName,
					"length":vm.programVariation,
					"users":vm.paid
	
				})


			}

			//return JSON object from Bodyweight API and convert to array
			function getBodyweight() {
				bodyweight.getBodyweight().then(function(result) {
					vm.exerciseBodyweight = result.data;
					console.log(vm.exerciseBodyweight);
				}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from Reps API and convert to array
			function getReps() {
				rep.getReps().then(function(result) {
					vm.reps = result.data;
					console.log(vm.reps);
				}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from Cardios API and convert to array
			function getCardio() {
				cardio.getCardio().then(function(result) {
					vm.exerciseCardio = result.data;
					console.log(vm.exerciseCardio);
				}, function(error) {
					console.log(error);
				});
			}

		}
})();
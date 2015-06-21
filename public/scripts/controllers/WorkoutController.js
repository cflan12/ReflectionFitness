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

			vm.exerciseBodyweight = [];

			vm.reps = [];

			vm.exerciseCardio = [];

			vm.node = [];

			//is an array object collections used for angular.extend
			vm.types = [ {"type":"Weighted"}, 
						 {"type":"Bodyweight"}, 
						 {"type":"Cardio"}
					];


			
			//get JSON objects from DB
			getExercises();

			getUsers();

			getBodyweight();

			getReps();

			getCardio();

			/*
			//Angular ui-tree $callbacks
			$treeOptions = {
				accept: function(sourceNodeScope, destNodeScope, destIndex) {
					return true;
				},
			}; 
			 	*/

			console.log("vm.types:");
			console.log(vm.types);
			

			/*
			$scope.$watch(vm.types, function(add) {

				angular.extend(vm.types.type, object);
			}, true);	
			*/		
		
			
			//return JSON object from exercise API, array is result.data
			function getExercises() {
				workout.getExercises().then(function(result) {
					vm.exercises = result;

					//$resouce is returned directly rendered to the view without storing array,
					//add API call to function
					angular.forEach(vm.types, function(result) {
						if(result.type == "Weighted"){
							result.exercise = angular.copy(vm.exercises);
						}
					});
					console.log(vm.exercises);
					}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from user API and convert to an array
			function getUsers() {
				users.getUser().then(function(result) {
					vm.subscribers = result;
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

			vm.drag = function() {

				console.log("vm.node");
				console.log(vm.node);
			}

			/*
			//log New Workout
			vm.logWorkout = function() {

				workout.saveWorkout({
					"name":vm.workoutType,
					"identifier":vm.programName,
					"length":vm.programVariation,
					"users":vm.paid
	
				})
			}
			 */

			//return JSON object from Bodyweight API and convert to array
			function getBodyweight() {
				bodyweight.getBodyweight().then(function(result) {
					vm.exerciseBodyweight = result;
					//$resouce is returned directly rendered to the view without storing array,
					//add API call to function
					angular.forEach(vm.types, function(result) {
						if(result.type == "Bodyweight"){
							result.exerise = angular.copy(vm.exerciseBodyweight);
						}
					}); 
					console.log(vm.exerciseBodyweight);
				}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from Reps API and convert to array
			function getReps() {
				rep.getReps().then(function(result) {
					vm.reps = result;
					//$resouce is returned directly rendered to the view without storing array,
					//add API call to function
					//array instantiated only on $resource query, not saved as new array
					/* angular.forEach(vm.types, function(result) {
						result.reps = angular.copy(vm.reps);
					});
					/*vm.types.reps = angular.copy(vm.reps); */
					console.log(vm.reps);
				}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from Cardios API and convert to array
			function getCardio() {
				cardio.getCardio().then(function(result) {
					vm.exerciseCardio = result;
					//$resouce is returned directly rendered to the view without storing array,
					//add API call to function
					angular.forEach(vm.types, function(result) {
						if(result.type == "Cardio"){
							result.exercise = angular.copy(vm.exerciseCardio);
						}
					}); 
					console.log(vm.exerciseCardio);
				}, function(error) {
					console.log(error);
				});
			}


			console.log("array for copy");
			//empty array because of $Resource object
			console.log(vm.reps);
			//copy array to nested array for ui-tree 
			

			console.log("test vm.types objects for ui-nested");
			console.log(vm.types);
			

		}
})();
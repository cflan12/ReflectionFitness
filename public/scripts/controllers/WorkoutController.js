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
			vm.types = [
							{"type":"weighted"}, 
							{"type":"bodyweight"}, 
							{"type":"cardio"}
						];
			//object for angular.extend
			vm.typesObject = {
				"type":"weighted",
				"type":"bodyweight",
				"type":"cardio"
			};
			
			//get JSON objects from DB
			getExercises();

			getUsers();

			getBodyweight();

			getReps();

			getCardio();

			console.log("vm.types:");
			console.log(vm.types);
			console.log("vm.typeObjects");
			//Not posting correctly or cycling through all properties
			console.log(vm.typesObject);
			

			/*
			console.log("extend type");
			angular.forEach(vm.types, function(result) {
				return angular.extend(result, user);
				console.log(result);
			}); 

			console.log("vm.types added property");
			console.log(vm.types);

			/*
			$scope.$watch(vm.types, function(add) {

				angular.extend(vm.types.type, object);
			}, true);			
			
			/*
			//All API calls are made to Laravel backend, angular.forEach array for nested tree view
			angular.forEach(vm.types, function(result) {
				if(result.type == "weighted")
					{
						result.concat(vm.exercises);
					}else if(result.type == "bodyweight")
					{	
						console.log(result);
					}else {
						console.log(result);
					}
			}); 
				*/
			
			//return JSON object from exercise API, array is result.data
			function getExercises() {
				workout.getExercises().then(function(result) {
					vm.exercises = result;
					//$resouce is returned directly rendered to the view without storing array,
					//add API call to function

					angular.forEach(vm.types, function(result) {
						if(result.type == "weighted"){
							return angular.extend(result, vm.exercises);
							console.log("vm.exercises returned from query in controller")
						}
					});
					console.log("vm.types with angular.extend from API call");
					console.log(vm.types);
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
						if(result.type == "bodyweight"){
							return angular.extend(result, vm.exerciseBodyweight);
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
					/*angular.forEach(vm.types, function(result) {
						if(result.type == "weight" || result.type == "bodyweight"){
							return angular.extend(result, vm.reps);
						}
					}); */
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
						if(result.type == "cardio"){
							return angular.extend(result, vm.exerciseCardio);
						}
					}); 
					
					console.log(vm.exerciseCardio);
				}, function(error) {
					console.log(error);
				});
			}

			/*
			console.log("vm.reps");
			angular.forEach(vm.reps.data, function(result) {
				console.log(result);
			});
			*/
		}
})();
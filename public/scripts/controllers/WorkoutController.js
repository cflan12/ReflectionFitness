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

			//get JSON objects from API as $resource
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

			//var list = new List();
			//console.log(list);

			var list = new Object();
			console.log("new object with prototype");
			console.log(list);
			

			/*
			$scope.$watch(vm.types, function(add) {

				angular.extend(vm.types.type, object);
			}, true);	
			*/		
		
			
			//return JSON object from exercise API, array is result.data
			function getExercises() {
				workout.getExercises().then(function(result) {
					//$resource object returned to controller 
					vm.exercises = result;

					var items = [];

					items = result.functionName();

					console.log("items");
					console.log(items);

					//object array copied from $resource object
					angular.forEach(vm.types, function(array) {
						if(array.type == "Weighted") {
							//save without iterating over $resource array
							//array.copies = angular.copy(vm.exercises);
							//array.extend = angular.extend(vm.exercises);

							//array.body = angular.copy(vm.exercises);
							array.item = angular.copy(items);
						}
					}); 
						console.log("properties");
						console.log(vm.types);
						console.log(vm.types.item);
						//console.log(vm.types.item.body);

						//Check hasOwnProperty()
						console.log(vm.types.hasOwnProperty('type'));

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

					var items = [];

					items = result.functionName();

					console.log("items body");
					console.log(items);

					angular.forEach(vm.types, function(result) {
						if(result.type == "Bodyweight"){
							//result.resource = angular.copy(vm.exerciseBodyweight);
							result.item = angular.copy(items);
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
					var items = [];

					items = result.listReps();

					console.log("items body");
					console.log(items);

					angular.forEach(vm.types, function(result) {
						result.reps = angular.copy(items);
					});

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

					var items = [];

					items = result.functionName();

					console.log("items body");
					console.log(items);

					angular.forEach(vm.types, function(result) {
						if(result.type == "Cardio") {
							result.resource = angular.copy(vm.exerciseCardio);
							result.item = angular.copy(items);
						}
					}); 
					console.log(vm.exerciseCardio);
				}, function(error) {
					console.log(error);
				});
			}

			console.log("test vm.types objects for ui-nested");
			console.log(vm.types)
		}
})();
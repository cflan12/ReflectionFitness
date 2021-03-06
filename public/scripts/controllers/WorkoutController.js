//Define application controller for RESTful API ngResource

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('WorkoutController', WorkoutController);

		//inject services into controller
		function WorkoutController(workout, users, bodyweight, rep, cardio, clientProgress, $scope, $rootScope, $state) {

		// Require JWT for API call by authorization		
		if ($rootScope.authenticated) {

			//console.log("rootScope");
			//console.log($rootScope);
			//console.log($rootScope.currentUser.id);
			//console.log("state")
			//console.log($state);

			var vm = this;

			vm.exercises = [];

			vm.subscribers = [];

			vm.exerciseBodyweight = [];

			vm.reps = [];

			vm.exerciseCardio = [];

			// Arrays for building workout program
			// Select exercises for workout program as an array of JSON objects
			vm.select = [];

			vm.workoutPlan = [];

			vm.workObject = [];

			vm.calendar = [ {"day":"Monday"},
							{"day":"Tuesday"},
							{"day":"Wednesday"},
							{"day":"Thursday"},
							{"day":"Friday"},
							{"day":"Saturday"},
							{"day":"Sunday"} ];

			var clientID = $rootScope.currentUser.id;

			vm.client = [];

			vm.clientProgram = [];

			//callstack for JSON arrays from API as $resoure objects
			getExercises();

			getUsers();

			getBodyweight();

			getCardio();

			getReps();

			getWorkouts();

			getClientWorkout();		
			
			
			//return JSON object from exercise API, array is result.data
			function getExercises() {
				workout.getExercises().then(function(result) {
					//$resource object returned to controller 
					vm.exercises = result;
					console.log(vm.exercises);
					}, function(error) {
					console.log(error);
				});
			}

			vm.deleteExercise = function(factory, id) {

				if(factory == 'workout') {
					workout.deleteExercise(id).then(function(success) {
						getExercises();
						console.log(success)
					}, function(error) {
						console.log(error);
					});
				} else if(factory == 'bodyweight') {
					bodyweight.deleteExercise(id).then(function(success) {
						getBodyweight();
						console.log(success);
					}, function(error) {
						console.log(error);
					});
				} else if(factory == 'cardio') {
					cardio.deleteExercise(id).then(function(success) {
						getCardio();
						console.log(success);
					}, function(error) {
						console.log(error);
					});
				} else {
					rep.deleteExercise(id).then(function(success) {
						getReps();
						console.log(success);
					}, function(errror) {
						console.log(error);
					});
				}
			}

			
			vm.addExercise = function(factory) {

				if(factory == 'workout') {
					workout.addExercise({
						"body":vm.addBody,
						"exercise":vm.newExercise
					}).then(function(success) {
						getExercises();
					}, function(error) {
						console.log(error);
					});

				}else if(factory == 'bodyweight') {
						bodyweight.addExercise({
							"body":vm.addBody,
							"exercise":vm.newExercise
						}).then(function(success) {
							getBodyweight(); 
					}, function(error) {
						console.log(error);
					});

				}else if(factory == 'cardio') {
						cardio.addExercise({
							"type":vm.addType,
							"exercise":vm.newExercise
						}).then(function(success) {
							getCardio();
					}, function(error) {
						console.log(error);
					});
				}else {
						rep.addExercise({
							"range":vm.addRep,
							"time_frame":vm.addTime,
							"rest_time":vm.addRest
						}).then(function(success) {
							getReps();
					}, function(error) {
						console.log(error);
					});
				}
			} 

			//update $resource object and send to API
			/// used for all Controller updates
			vm.update = function(factory, data) {
				if(factory == 'reps') {
					rep.update({
						"id":data.id,
						"range":data.updateBody,
						"time_frame":data.updateExercise,
						"rest_time":data.updateRep
					}).then(function(success){
						console.log(success);
						getReps();
					}, function(error) {
						console.log(error);
					});
				}else if(factory == 'user') {
					var user = {
						"id":data.id,
						"name":data.name,
						"email":data.email,
						"role":data.role
					}
					users.update(user).then(function(success) {
						console.log(success);
						getUsers();
					}, function(error) {
						console.log(error);
					});
				}else if(factory == 'workout') {
					workout.update({
						"id":data.id,
						"body":data.updateBody,
						"exercise":data.updateExercise
					}).then(function(success){
						console.log(success);
						getExercises();
					}, function(error) {
						console.log(error);
					});
				}else if (factory == 'bodyweight') {
					bodyweight.update({
						"id":data.id,
						"body":data.updateBody,
						"exercise":data.updateExercise
					}).then(function(success) {
						console.log(success);
						getBodyweight();
					}, function(error) {
						console.log(error);
					});
				}else {
					cardio.update({
						"id":data.id,
						"type":data.updateBody,
						"exercise":data.updateExercise
					}).then(function(success) {
						console.log(success);
						getCardio();
					}, function(error) {
						console.log(error);
					});
				}
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

			vm.selectExercise = function(data, item, date) {

				if(item == false) {
					alert('Select Reps Before Adding to Program');
				}
				//data is an object, not any array for the array prototype
				//data structure is an array of $resource objects

				//save objects to array as $resource objects 
				//selected from ng-click
				var mergedObject = angular.extend(data, item, date);

				// push is an array operation
				vm.select.push(mergedObject);

				//clear selected item on next select
				
				//console.log("vm.select");
				//console.log(vm.select);
			}


			//log New Workout
			// add function to save to a specific user
			vm.logWorkout = function() {
				// convert array of objects to JSON string
				var workoutJSONstring = JSON.stringify(vm.select);
				//console.log("JSON");
				//console.log(workoutJSONstring);
				workout.saveWorkout({
					"workout":workoutJSONstring,
					"name":vm.programName,
					"goal":vm.workoutType,
					"weeks":vm.programVariation,
					"frequency":vm.programLength
				}).then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});

				getWorkouts();
				// clear workout data after POST to API
				vm.select = "";
				vm.programName = "";
				vm.workoutType = "";
				vm.programVariation = "";
				vm.programLength = "";
			}

			// update user with workout and send to API
			vm.assignWorkout = function(subscriber) {
				var workoutProgram = vm.assignProgram.id;
				var client = subscriber.id;
				users.assignWorkout({
					"id":client,
					"user_workout":workoutProgram
				}).then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			// return workout plans from API
			function getWorkouts() {
				workout.getWorkouts().then(function(result) {
					// returned as $resource with workout property as a string
					vm.workoutPlan = result.data;
					// list of JSON parsed workouts
					vm.workObject = vm.workoutPlan.listWorkouts();

					//console.log("vm.workoutPlan");
					//console.log(vm.workoutPlan);
					//console.log("vm.workObject");
					//console.log(vm.workObject);

				}, function(error) {
					console.log(error);
				});
			}

			function getClientWorkout() {
				users.getClient(clientID).then(function(result) {
					console.log(result);
					vm.client = result.data;

					//foreign key on the client side
					var workout = result.data.user_workout;
					console.log("workout");
					console.log(workout);

					//call Foreign key on frontend then backend (optimize)
					// setup getWorkouts() with null parameter for admin or 
					// user without program

					//call if result.data.user_workout is not undefined
					getWorkout(workout);
				}, function(error) {
					console.log(error);
				});
			}

			// save client progress and send to API
			vm.clientProgress = function(exercises) {
			
					var i;
					var tmpProgress = [];
					var output = [];
					var data = vm.progress;

					// Time function for progress save
					vm.time = moment().format('LL');
					//console.log("data");
					//console.log(data);

					angular.forEach(exercises, function(result) {
						tmpProgress.push(result.exercise);
					});
					
					// Check for exercise workout array key to correspond
					// with object property key for specific workout
					// Save to new Array of objects
					angular.forEach(tmpProgress, function(result, key) {
						angular.forEach(data, function(object, property) {
							if(key == property) {
								output.push({exercise:result, weight:object});
							}
						});
					});

					
					//convert vm.progressExercise to array
					console.log("output array");
					console.log(output);

					var outputJSON = JSON.stringify(output);

					//console.log(tmpProgress);
					//console.log("tmpProgress with weight");
					//console.log(tmpProgress);
				clientProgress.saveProgress({
					"date":vm.time,
					"client_id":$rootScope.currentUser.id,
					"workout_progress":outputJSON
				}).then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				}); 

				//clear input fields
				vm.progress = '';
			} 

			// called from getClientWorkout foreign key to API
			function getWorkout(id) {
				workout.clientWorkout(id).then(function(result) {
					vm.clientProgram = result.data;
					console.log(vm.clientProgram);
					var JSONstring = JSON.parse(result.data.workout);
					console.log('JSON string');
					console.log(JSONstring);
					vm.clientProgram.program = JSONstring;
					console.log(vm.clientProgram);
				}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from Bodyweight API and convert to array
			function getBodyweight() {
				bodyweight.getBodyweight().then(function(result) {
					vm.exerciseBodyweight = result;
					console.log(vm.exerciseBodyweight);
				}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from Cardios API and convert to array
			function getCardio() {
				cardio.getCardio().then(function(result) {
					vm.exerciseCardio = result;
					console.log(vm.exerciseCardio);
				}, function(error) {
					console.log(error);
				});
			}

			//return JSON object from Reps API using async promise
			function getReps() {
				rep.getReps().then(function(result) {
					vm.reps = result;
					console.log(vm.reps);
				}, function(error) {
					console.log(error);
				});
			}
		}
		// Prevent $resource call without JWT authentication  
		else {
			console.log('authentication error');
			}
		}

})();
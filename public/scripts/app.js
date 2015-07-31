//Define application module and dependencies

(function() {

	'use strict';

	var workoutApp = angular
						.module('workoutApp', [
							'ngResource',
							'ui.bootstrap',
							'ui.utils',
							'ngRoute',
							'ui.router',
							'ui.tree'
						]);

		//Constructor for prototype
		/*
		function List() {
			this.title = "list";
		} */

		//Constructor points back to original function we defined
		//List.prototype.constructor == List;

		Array.prototype.functionName = function() {

			//clear the array in each call stack from API Resource call
			var tmp = [];

    		//sorting Resource object to array
    		//console.log("Array prototype", this, this.length);
    		//Modify Resource object with prototype for specific properties
    			this.forEach(function(item) {

					//constructor for prototype properties

    				//specific for the object
    				var body = item.body
    				var exercise = item.exercise;
    				
    				tmp.push({"body": body, "exercise": exercise});
    				//tmp.push(item.body, item.exercise);	
				});
					return tmp;
			}

		Array.prototype.listReps = function() {

			var tmp = [];

			this.forEach(function(item) {
				tmp.push({range: item.range, rest_time: item.rest_time, time_frame: item.time_frame});
			});
				return tmp;
		}			
		
		//configure routes with ngRoute
		workoutApp.config(function($routeProvider) {
			$routeProvider

			//route for home page
			.when('/', {
				templateUrl : 'templates/home.html',
				//controller : 'WorkoutController'
			})

			//route for exercises page
			.when('/exercises', {
				templateUrl : 'templates/exercises.html',
				//controller : 'WorkoutController'
			})

			//route for users page
			.when('/users', {
				templateUrl : 'templates/users.html',
				//controller : 'WorkoutController'
			})

			//route for admin page
			.when('/admin', {
				templateUrl : 'templates/admin.html',
				//controller : 'WorkoutController'
			})

			//route for analytics page
			.when('/analytics', {
				templateUrl : 'templates/analytics.html',
				//controller : 'WorkoutController'
			});
		
		});

		//configure nested views with ui-router
		workoutApp.config(function($stateProvider) {

			$stateProvider

			//nested weighted exercises view
			.state("exercises", {
				templateUrl: 'templates/partials/exercises/weighted.html'
			})
			//nested bodyweight view
			.state("bodyweight", {
				templateUrl: 'templates/partials/exercises/bodyweight.html'
			})
			//nested cardio view
			.state("cardio", {
				templateUrl: 'templates/partials/exercises/cardio.html'
			})
			//nested reps view
			.state("reps", {
				templateUrl: 'templates/partials/exercises/reps.html'
			})

			/*
			//workout plan view
			.state("workout", {
				views: {
					"workout": {templateUrl: 'templates/partials/exercises/workout.html'}
				}
			}) */

		});

		/*
		//custom filters
		workoutApp.filter('exercises', function() {
			//
			return function(items, vm.exercises) {
				var filtered = [];

				for( var i = 0; i < items.length; ++i) {
					//do something
				}
				return filtered;
			};
		}); 
		*/
				

		//function for bootstrap collapsed menu
		function NavBarCtrl($scope) {
			$scope.isCollapsed = true;
		}
})();
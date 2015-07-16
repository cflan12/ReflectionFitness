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

		var tmp = [];

		Array.prototype.functionName = function() {
    		//sorting Resource object to array
    		console.log("Array prototype", this, this.length);
    		//Modify Resource object with prototype for specific properties
    			this.forEach(function(item) {
        			console.log(item);
        			tmp.push(item);
			
				});
			
					var length = tmp.length;
					console.log(tmp);
					console.log(length);
					return tmp;
					 
		}

		/*
		Object.prototype.list = function() {

			this.forEach(function(item) {
				console.log(item);
			});
		}	
			*/			
		
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
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
							'ui.tree',
							'satellizer',
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
			.when('/clients', {
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




			//admin customers views
			.state("customers", {	
				templateUrl: 'templates/partials/admin/customers.html'
			})
			//admin workout build
			.state("workout", {
				templateUrl: 'templates/partials/admin/workoutprogram.html'
			})
			//admin workout plans 
			.state("workoutplan",{
				templateUrl: 'templates/partials/admin/workout.html'
			})
			//admin exercise database
			.state("exerciseDatabase", {
				templateUrl: 'templates/partials/admin/exercisedatabase.html'
			})


			//admin build workout weighted
			.state("workout.weighted", {
				templateUrl: 'templates/partials/admin/weightexercises.html'
			})
			//admin build workout bodyweight 
			.state("workout.bodyweight", {
				templateUrl: 'templates/partials/admin/bodyweightexercises.html'
			})
			//admin build workout cardio
			.state("workout.cardio", {
				templateUrl: 'templates/partials/admin/cardioexercises.html'
			})

		});

		workoutApp.config(function($stateProvider, $urlRouterProvider, $authProvider) {

			// Satellizer configuration that specifies which 
			// route the JWT should be retrieved from
			// Satellizer provides $authProvider
			// stateProvider setup is for the two states the app 
			// can have: auth and user

			// Satellizer makes an $http.post call to this API login
			$authProvider.loginUrl = '/api/authenticate';

			//Redirect to the auth state if any other states
			//are requested other than user
			$urlRouterProvider.otherwise('/auth');

			$stateProvider
				.state('auth', {
					url: '/auth',
					templateUrl: 'templates/auth/authView.html',
					controller: 'AuthController as auth'
				})
				.state('users', {
					url: '/users',
					templateUrl: 'templates/auth/userView.html',
					controller: 'UserController as user'
				});
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
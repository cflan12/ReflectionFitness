//Define application module and dependencies

(function() {

	'use strict';

	var workoutApp = angular
						.module('workoutApp', [
							'ngResource',
							'ui.bootstrap',
							'ui.utils',
							'ngRoute'
						]);
		
		//configure routes
		workoutApp.config(function($routeProvider) {
			$routeProvider

			//route for home page
			.when('/', {
				templateUrl : 'templates/home.html',
				controller : 'WorkoutController'
			})
			
			//route for test page
			.when('/testRoute', {
				templateUrl : 'templates/test.html',
				controller : 'WorkoutController'
			})

			//route for exercises page
			.when('/exercises', {
				templateUrl : 'templates/exercises.html',
				controller : 'WorkoutController'
			})

			//route for users page
			.when('/users', {
				templateUrl : 'templates/users.html',
				controller : 'WorkoutController'
			})

			//route for admin page
			.when('/admin', {
				templateUrl : 'templates/admin.html',
				controller : 'WorkoutController'
			})

			//route for analytics page
			.when('/analytics', {
				templateUrl : 'templates/analytics.html',
				controller : 'WorkoutController'
			});
		});

		//function for bootstrap collapsed menu
		function NavBarCtrl($scope) {
			$scope.isCollapsed = true;
		}
})();
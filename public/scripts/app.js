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

			//route for test page
			.when('/testRoute', {
				templateUrl : 'templates/test.html',
				controller : 'Workout'
			})

			//route for exercises
			.when('/exercises', {
				templateUrl : 'templates/exercises.html',
				controller : 'Workout'
			})

			//route for users
			.when('/users', {
				templateUrl : 'templates/users.html',
				controller : 'Workout'
			})

			//route for analytics
			.when('/analytics', {
				templateUrl : 'templates/analytics.html',
				controller : 'Workout'
			});
		});

		//function for bootstrap collapsed menu
		function NavBarCtrl($scope) {
			$scope.isCollapsed = true;
		}
})();
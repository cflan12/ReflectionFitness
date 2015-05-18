//Define application module and dependencies

(function() {

	'use strict';

	var workoutApp = angular
						.module('workoutApp', [
							'ngResource',
							'ui.bootstrap',
							'ui.utils',
							'ngRoute',
							'ui.router'
						]);
		
		//configure routes with ngRoute
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

		//configure nested views with ui-router
		workoutApp.config(function($stateProvider) {

			$stateProvider

			.state("exercises", {
				templateUrl: 'templates/partials/exercises/weighted.html'
			})

			.state("bodyweight", {
				templateUrl: 'templates/partials/exercises/bodyweight.html'
			})

		});
				

		//function for bootstrap collapsed menu
		function NavBarCtrl($scope) {
			$scope.isCollapsed = true;
		}
})();
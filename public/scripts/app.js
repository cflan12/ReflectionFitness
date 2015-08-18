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
							'satellizer',
						]);
		
		
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
		
		//login configuration and route filtering
		workoutApp.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide) {

			function redirectWhenLoggedOut($q, $injector) {

				return {

					responseError: function(rejection) {

						// use $injector.get to bring in $state or else
						// we get circular dependency error
						var $state = $injector.get('$state');

						// Instead of checking for Laravel 400 status code, which could
						// result from other errors, we check for the specific rejection
						// errors to determine if authentication is required
						// errors are provided by JWT on Laravel API
						var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

						// iterate through reject array and redirect if any state is encountered
						angular.forEach(rejectionReasons, function(value,key) {

							if(rejection.data.error === value) {

								// if we get a rejection corresponding to one of the array values in 
								// rejectionReasons, the user has to be authenticated and remove
								// current user from local storage
								localStorage.removeItem('user');

								// send user to auth login
								$state.go('auth');
							}
						});

							return $q.reject(rejection);
					}
				}
			}

			// Setup for the $httpInterceptor
			$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

			// Push the new factory on the $httpInterceptor array
			$httpProvider.interceptors.push('redirectWhenLoggedOut');

			// Satellizer configuration that specifies which 
			// route the JWT should be retrieved from
			// Satellizer provider is $authProvider

			// Satellizer makes an $http.post call to this API login
			$authProvider.loginUrl = '/api/authenticate';

			//Redirect to the auth state if any other states
			//are requested other than user
			$urlRouterProvider.otherwise('/login');

			// navbar routes for admin
			$stateProvider
				// home
				.state('/', {
					url: '/',
					templateUrl:'templates/home.html',
				})
				.state('auth', {
					url: '/login',
					templateUrl: 'templates/auth/authView.html',
					controller: 'AuthController as auth'
				})
				.state('profile', {
					url: '/profile/',
					templateUrl: 'templates/auth/userView.html',
					 controller: 'UserController as user'
				})
				/* Admin Nabvar
				.state('profile.navbarAdmin', {
					templateUrl: 'templates/auth/adminNavigation.html'
				}) */
				//route for exercises page
				.state('profile.exercises', {
					url: 'userID/exercises',
					templateUrl : 'templates/exercises.html',
					controller : 'WorkoutController as vm'
				})
				//route for users page
				.state('profile.clients', {
					url: 'userID/clients',
					templateUrl : 'templates/users.html',
					controller : 'WorkoutController as vm'
				})
				//route for admin page
				.state('profile.admin', {
					url: 'userID/admin',
					templateUrl : 'templates/admin.html',
					controller : 'WorkoutController as vm'
				})
				//route for analytics page
				.state('profile.analytics', {
					url: 'userID/analytics',
					templateUrl : 'templates/analytics.html',
					controller : 'WorkoutController as vm'
				})

			//nested weighted exercises view
			.state('profile.exercises.exercises', {
				templateUrl: 'templates/partials/exercises/weighted.html',
				controller: 'WorkoutController as vm'
			})
			//nested bodyweight view
			.state('profile.exercises.bodyweight', {
				templateUrl: 'templates/partials/exercises/bodyweight.html',
				controller: 'WorkoutController as vm'
			})
			//nested cardio view
			.state('profile.exercises.cardio', {
				templateUrl: 'templates/partials/exercises/cardio.html',
				controller: 'WorkoutController as vm'
			})
			//nested reps view
			.state('profile.exercises.reps', {
				templateUrl: 'templates/partials/exercises/reps.html',
				controller: 'WorkoutController as vm'
			})

			//admin customers views
			.state("profile.admin.customers", {	
				templateUrl: 'templates/partials/admin/customers.html',
				controller: 'WorkoutController as vm'
			})
			//admin workout build
			.state("profile.admin.workout", {
				templateUrl: 'templates/partials/admin/workoutprogram.html'
			})
					//admin nested build workout weighted
					.state("profile.admin.workout.weighted", {
					templateUrl: 'templates/partials/admin/weightexercises.html'
				})
					//admin build workout bodyweight 
					.state("profile.admin.workout.bodyweight", {
					templateUrl: 'templates/partials/admin/bodyweightexercises.html'
					})
					//admin build workout cardio
					.state("profile.admin.workout.cardio", {
					templateUrl: 'templates/partials/admin/cardioexercises.html'
				})

			//admin workout plans 
			.state("profile.admin.workoutplan",{
				templateUrl: 'templates/partials/admin/workout.html'
			})
			//admin exercise database
			.state("profile.admin.exerciseDatabase", {
				templateUrl: 'templates/partials/admin/exercisedatabase.html'
			});
		})



		workoutApp.run(function($rootScope, $state) {

			// $stateChangeStart is fired whenever state changes. We can use
			// parameters such as toState for details about the state changing
			$rootScope.$on('$stateChangeStart', function(event, toState) {

				// Grab user from local storage and parse it to an object
				var user = JSON.parse(localStorage.getItem('user'));

				// If there is user data in local storage then the user
				// should be authenticated. If their token is expired or
				// the user is not authenticated, then will be redirected 
				// to the auth state due to the rejected request
				if(user) {

					// User's authenicated state get's flipped to true 
					// to show authenticatd UI
					$rootScope.authenticated = true;

					// Putting user's data on $rootScope allows us to access
					// it anywhere across the app. Here we are grabbing what
					// is in local storage
					$rootScope.currentUser = user;

					// If the user is logged in and we hit the auth route
					// redirect the user to the main state
					if(toState.name === "auth") {

						// Preventing the default behavior allows us to use $state.go
						// to change states
						event.preventDefault();

						// go to the main states
						$state.go('profile');
					}
				}
			});
		});
				

		//function for bootstrap collapsed menu
		function NavBarCtrl($scope) {
			$scope.isCollapsed = true;
		}
})();
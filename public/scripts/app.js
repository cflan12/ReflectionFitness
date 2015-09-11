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

		// workout program list is returned as an array by the API
		Array.prototype.listWorkouts = function() {

			var tmp = [];

			this.forEach(function(item) {
				// convert workout property string of array
				// of JSON objects to objects
				var string = JSON.parse(item.workout);
				// object is stored as an array of nested objects for property
				tmp.push({program: string});
				//console.log(item.workout);
				//console.log(tmp);
			});
				return tmp;
		}

		// client progress report array 
		Array.prototype.listClientReport = function() {

			var tmp = [];

			this.forEach(function(value, key) {
				var string = JSON.parse(value.workout_progress);
				tmp.push({progress: string, date: value.date})

				/*
				this.forEach(tmpJSON, function(value, key) {
					//parse from first iteration split
					var string = JSON.parse(tmpJSON.exercise);
					tmp.push({exercise: string});
				}); */
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

						// inject state to get access to parameters in the URL
						// but parameters available only from the associated controller
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
					templateUrl: 'templates/auth/authLogin.html',
					controller: 'AuthController as auth',
				})
				.state('signup', {
					url:'/signup',
					templateUrl: 'templates/auth/authSignup.html',
					controller: 'AuthController as auth',
				})
				// admin UI
				.state('admin', {
					url: '/admin/:id',
					views: {
						'admin': {
							templateUrl:'templates/auth/adminView.html',
							controller: 'UserController as user',

						},
						'adminNavbar': {
							templateUrl: 'templates/auth/adminNavigation.html'
						}
					}
				})
				// user UI
				.state('profile', {
					url: '/profile/:id',
					views: {
						'profile':{
							templateUrl: 'templates/auth/userView.html',
							controller: 'UserController as user',
						},
						'userNavbar': {
							templateUrl: 'templates/auth/userNavigation.html'
						},
					}
				})

				// user navigation
				.state('profile.profile', {
					url:'/profilename',
					templateUrl: 'templates/user/userProfile.html',
					controller: 'WorkoutController as vm'
				})
				.state('profile.program', {
					url: '/workout',
					templateUrl: 'templates/user/userProgram.html',
					controller: 'WorkoutController as vm'
				})
				.state('profile.progress', {
					url: '/progress',
					templateUrl: 'templates/user/userProgress.html',
					controller: 'WorkoutController as vm'
				})
				// needs to be nested views, with progress
				.state('profile.progressDisplay', {
					templateUrl: 'templates/user/userProgressGraph.html',
					controller: 'ClientController as vm'
				})
				// admin navigation
				.state('admin.exercises', {
					url: '/exercises',
					templateUrl : 'templates/exercises.html',
					controller : 'WorkoutController as vm'
				})
				.state('admin.clients', {
					url: '/clients',
					templateUrl : 'templates/users.html',
					controller : 'WorkoutController as vm'
				})
				.state('admin.admin', {
					url: '/panel',
					templateUrl : 'templates/admin.html',
					controller : 'WorkoutController as vm'
				})
				.state('admin.analytics', {
					url: '/analytics',
					templateUrl : 'templates/analytics.html',
					controller : 'WorkoutController as vm'
				})

			//nested weighted exercises view from profile.exercises 
			// WorkoutController is injected from parent
			.state('admin.exercises.exercises', {
				templateUrl: 'templates/partials/exercises/weighted.html',
			})
			//nested bodyweight view
			.state('admin.exercises.bodyweight', {
				templateUrl: 'templates/partials/exercises/bodyweight.html',
			})
			//nested cardio view
			.state('admin.exercises.cardio', {
				templateUrl: 'templates/partials/exercises/cardio.html',
			})
			//nested reps view
			.state('admin.exercises.reps', {
				templateUrl: 'templates/partials/exercises/reps.html',
			})

			//admin panel customers views
			.state("admin.admin.customers", {	
				templateUrl: 'templates/partials/admin/customers.html',
				controller: 'WorkoutController as vm'
			})
			//admin panel workout build
			.state("admin.admin.workout", {
				templateUrl: 'templates/partials/admin/workoutprogram.html'
			})
					//admin nested build workout weighted
					.state("admin.admin.workout.weighted", {
						templateUrl: 'templates/partials/admin/weightexercises.html'
					})
					//admin build workout bodyweight 
					.state("admin.admin.workout.bodyweight", {
						templateUrl: 'templates/partials/admin/bodyweightexercises.html'
					})
					//admin build workout cardio
					.state("admin.admin.workout.cardio", {
						templateUrl: 'templates/partials/admin/cardioexercises.html'
					})
			//admin panel workout plans 
			.state("admin.admin.workoutplan",{
				templateUrl: 'templates/partials/admin/viewWorkoutProgram.html'
			});
		})

		// checking state of active user
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

						//manage state for authentication role
						if($rootScope.currentUser.role == 'admin') {
							$state.go('admin');
						} else {
							// go to the user UI
							$state.go('profile');
						}
					}
				}
			});
		});
				
		//function for bootstrap collapsed menu
		function NavBarCtrl($scope) {
			$scope.isCollapsed = true;
		}
})();
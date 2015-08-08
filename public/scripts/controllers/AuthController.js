//Define Authentication controller for RESTful API ngResource

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('AuthController', AuthController);

	// Injecting $auth which is a service from Satellizer to
	// work communicate with the API 
	// $state handles the redirects for $auth
	// inject user service for ngResource API
	function AuthController($auth, $state, $http, $rootScope) {

		var vm = this;

		vm.loginError = false;
		vm.loginErrorText;

		vm.login = function() {

			var credentials = {
				email: vm.email,
				password: vm.password
			}

			// Use Satellizer's $auth service to send credentials to API
			$auth.login(credentials).then(function() {

				// If login is successful, redirect to the users state
				//$state.go('users', {});
				//$state.go('profile', {});

				return $http.get('api/authenticate/user');
				console.log("user authenticated");

				// Handle errors
				}, function(error) {
					vm.loginError = true;
					vm.loginErrorText = error.data.error;
					console.log("user authentication error");

				// Return $http.get request in the $auth.login promise
				// and chain the next promise to the end here
				}).then(function(response) {

					// Stringify returned data to prepare it to
					// go into local storage
					var user = JSON.stringify(response.data.user);

					// Set stringified user data into local storage
					localStorage.setItem('user', user);

					// User's authenticated state is not true
					// We can show parts of the UI that rely on 
					// the user being logged in
					$rootScope.authenticated = true;

					// Putting the user's data on $rootScope allows
					// access to it globally on the app
					$rootScope.currentUser = response.data.user;

					// Redirect user's state to view UI data
					$state.go('profile');
				});
			
			}

		}

})();
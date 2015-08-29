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

				// Return an $http request for the now authenticated
				// user to flatten the promise chain
				return $http.get('api/authenticate/user');

				// Handle errors
			}, function(error) {
				vm.loginError = true;
				vm.loginErrorText = error.data.error;

				// Because $http.get request returned in $auth.login promise,
				// now chain the next promise to the end here
				}).then(function(response) {

					//console.log("JWT response");
					//console.log(response);

					// Stringify returned data to prepare it to
					// go into local storage, allowing to be added as a header
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
					// depending on user role
					if(response.data.user.role == "admin") {
						$state.go('admin', {id: $rootScope.currentUser.id});
					} else {
						$state.go('profile', {id: $rootScope.currentUser.id});
					}
				});
			}
		}

})();
//Define Authentication controller for RESTful API ngResource

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('AuthController', AuthController);

	// Injecting $auth which is a service from Satellizer to
	// work communicate with the API 
	// $state handles the redirects for $auth
	function AuthController($auth, $state) {

		var vm = this;

		vm.login = function() {

			var credentials = {
				email: vm.email,
				password: vm.password
			}

			// Use Satellizer's $auth service to login
			$auth.login(credentials).then(function(date) {

				// If login is successful, redirect to the users state
				//$state.go('users', {});
				$state.go('profile', {});

				// Successful login should see a token stored in local storage
			});
		}

	}

})();
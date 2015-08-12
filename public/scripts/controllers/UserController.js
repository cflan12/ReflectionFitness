//Define User controller

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('UserController', UserController);

	// $auth service provided by Satellizer
	function UserController($http, $auth, $rootScope) {

		var vm = this;

		vm.users;
		vm.error;

		vm.getUsers = function() {

			// $http service for Laravel API 
			$http.get('api/authenticate').success(function(users) {
				vm.users = users;
			}).error(function(error) {
				vm.error = error;
			}); 
		}

		// Proper structure would have login and logout
		// method in the same place, extracted as a service 
		vm.logout = function() {

			// $auth service logout function
			$auth.logout().then(function() {

				// Remove the authenticated user from local storage
				localStorage.removeItem('user');

				// Authenticated user is now false using $rootScope
				$rootScope.authenticated = false;

				// Remove current user data from rootScope
				$rootScope.currentUser = null;
			});
		}
	}

})();
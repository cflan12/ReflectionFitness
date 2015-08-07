//Define User controller

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('UserController', UserController);

	function UserController($http) {

		var vm = this;

		vm.users;
		vm.error;

		vm.getUsers = function() {

			vm.users = {"name":"test", "email":"test"};
			// This request will hit the index method in the 
			// AuthenticationController for the Laravel API
			/* Calling the wrong API for users
			$http.get('api/authenticate').success(function(users) {
				vm.users = users; 
			}).error(function(error) {
				vm.error = error;
			}); */
		}
	}

})();
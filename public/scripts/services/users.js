
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('users', users);

		function users($resource) {

			var User = $resource('api/users/:id', {}, {
				update: {
					method: 'PUT'
				},
				'query': {method: 'GET', isArray: false}
			});

			//query API for users and return JSON object with get method
			function getUser() {
				return User.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			//send POST data to API
			function saveUser(data) {
				return User.save(data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			//send DELETE data to API
			function deleteUser(id) {
				return User.delete({id:id}).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getUser: getUser,
				saveUser: saveUser,
				deleteUser: deleteUser
			}
		}
})();
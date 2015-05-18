
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('users', users);

		function users($resource) {

			var User = $resource('api/users', {}, {
				update: {
					method: 'PUT'
				}
			});

			//query API for users and return JSON object with get method
			function getUser() {
				return User.get().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getUser: getUser
			}
		}
})();

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
				query: {
						method: 'GET', 
						isArray: true,

				},
				client: {
						method: 'GET', 
						isArray: false,
					},
			});

			//function for getClient to show object to controller



			// query API for all users and return JSON object with get method
			function getUser() {
				return User.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			// send POST data to API
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

			// assign Workout foreign id to user
			// send to API as update method
			function assignWorkout(data) {
				return User.update({id:data.id}, data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			// workout program saved as foreign key
			// call user with key and then call workout program
			// return object to UI
			function getClient(id) {
				return User.client({id:id}).$promise.then(function(result) {
					return result;
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getUser: getUser,
				saveUser: saveUser,
				deleteUser: deleteUser,
				assignWorkout: assignWorkout,
				getClient: getClient
			}
		}
})();
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('stripe', stripe);

		function stripe($resource) {

			var Subscriber = $resource('api/subscription/:id', {}, {
				update: {
					method: 'PUT'
				}
			});

			//send to AuthController after Stripe authentication
			function authenticate(data) {
				//Stripe credentials
				var credentials = {
					email: data.email,
					password: data.password
				}
				console.log(credentials);
			}

			//send credit card token to API
			function subscribe(data) {
				console.log(data);
				return Subscriber.save(data).$promise.then(function(success) {
					console.log(success);
					//authenticate(data);
				}, function(error) {
					console.log(error);
				});
			}

			return {
				subscribe: subscribe,
				authenticate: authenticate
			}
				
		}
})();
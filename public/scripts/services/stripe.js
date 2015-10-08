(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('stripe', stripe);

		function stripe($resource) {

			var Subscriber = $resource('api/subscribe/:id', {
				update: {
					method: 'PUT'
				}
			});

			//send credit card token to API
			function subscribe(data) {
				return Subscriber.save(data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			return {
				subscribe: subscribe
			}
		}
})();
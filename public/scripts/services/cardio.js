
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('cardio', cardio);

		function cardio($resource) {

			var Cardio = $resource('api/cardios', {}, {
				update: {
					method: 'PUT'
				}
			});

			//query API for cardio exercises and return JSON object with get method
			function getCardio() {
				return Cardio.get().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getCardio: getCardio
			}
		}
})();
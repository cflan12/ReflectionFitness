
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('bodyweight', bodyweight);

		function bodyweight($resource) {

			var Bodyweight = $resource('api/bodyweights', {}, {
				update: {
					method: 'PUT'
				}
			});

			function getBodyweight() {
				return Bodyweight.get().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getBodyweight: getBodyweight
			}
		}
})();
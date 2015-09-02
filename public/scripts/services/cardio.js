
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('cardio', cardio);

		function cardio($resource) {

			var Cardio = $resource('api/cardios/:id', {}, {
				update: {
					method: 'PUT'
				},
				query: {method: 'GET', isArray: true}
			});

			//query API for cardio exercises and return JSON object with get method
			function getCardio() {
				return Cardio.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			function deleteExercise(id) {
				return Cardio.delete({id:id}).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getCardio: getCardio,
				deleteExercise: deleteExercise
			}
		}
})();
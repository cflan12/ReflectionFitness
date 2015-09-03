
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('bodyweight', bodyweight);

		function bodyweight($resource) {

			var Bodyweight = $resource('api/bodyweights/:id', {}, {
				update: {
					method: 'PUT'
				},
				query: {method: 'GET', isArray: true}
			});

			function getBodyweight() {
				return Bodyweight.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			function deleteExercise(id) {
				return Bodyweight.delete({id:id}).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			function addExercise(data) {
				return Bodyweight.save(data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}


			return {
				getBodyweight: getBodyweight,
				deleteExercise: deleteExercise,
				addExercise: addExercise
			}
		}
})();
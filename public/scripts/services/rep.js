
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('rep', rep);

		function rep($resource) {

			var Reps = $resource('api/reps/:id', {}, {
				update: {
					method: 'PUT'
				},
				query: {method: 'GET', isArray: true}
			});

			//query APU for reps and return JSON object with get method
			function getReps() {
				return Reps.query().$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}

			function deleteExercise(id) {
				return Reps.delete({id:id}).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			function addExercise(data) {
				return Reps.save(data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			function update(date) {
				return Reps.update({id:data.id}, data).$promise.then(function(success) {
					console.log(success);
				}, function(error) {
					console.log(error);
				});
			}

			return {
				getReps: getReps,
				deleteExercise: deleteExercise,
				addExercise: addExercise,
				update: update
			}
		}

})();
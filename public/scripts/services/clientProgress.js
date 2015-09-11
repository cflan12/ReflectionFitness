
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.factory('clientProgress', clientProgress);

		function clientProgress($resource) {

			var Progress = $resource('api/clientProgress/:id', {}, {
				update: {
					method: 'PUT'
				},
				query: {
					method: 'GET',
					isArray: false,
				}
			});

			// add all API functions

			function saveProgress(data) {
				return Progress.save(data).$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				}); 
			}

			function getClientInput(id) {
				return Progress.query({client_id:id}).$promise.then(function(results) {
					return results;
				}, function(error) {
					console.log(error);
				});
			}


				return {
					saveProgress: saveProgress,
					getClientInput: getClientInput
				}
			}
})();


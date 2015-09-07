
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
			});

			// add all API functions

			function saveProgress(data) {
				return clientProgress.save(data).then(function(results){
					return results;
				}, function(error) {
					console.log(error);
				});
			

				return {
					saveProgress: saveProgress
				}
			}
})();


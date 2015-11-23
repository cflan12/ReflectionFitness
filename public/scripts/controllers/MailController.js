(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('MailController', MailController);

		function MailController($scope, $http) {

			$scope.success = false;
			$scope.error = false;

			$scope.sendMessage = function( input ) {
				$http({
					method: 'POST',
					url: '/submitConsultationForm',
					data: input,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
				})
				.success( function(data) {
					if(data.success) {
						$scope.success = true;
					} else {
						$scope.error = true;
					}
				});
			}

		}
})();
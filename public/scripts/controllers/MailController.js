(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('MailController', MailController);

		function MailController($scope, $http) {

			$scope.submitConsultation = function() {
				var data = { 'email': $scope.email };
				$http({
					method: 'POST',
					url: '/submitConsultationForm',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
					data : $.param(data);
				});
			}	
		}

		
})();
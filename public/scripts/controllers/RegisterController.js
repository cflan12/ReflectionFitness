//Define Registration controller for RESTFUL API ngResource

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('RegisterController', RegisterController);

		function RegisterController(stripe, users, $http, $scope, $state) {

			//stripe token
			var token;

			//stripe-form directive Stripe reponse handler callback
			$scope.stripeReflectionFitness = function(status, response) {
				if(response.error) {
					console.log("Stripe Error");
				} else {
					// got stripe token
					token = response.id
					//charge stripe token to API
					console.log("token sent response");
					console.log(token);

					//maintain stripe form $scope
					//stripe service
					stripe.subscribe({
						"name":$scope.name,
						"email":$scope.email,
						"password":$scope.password,
						"subscriber":true,
						"role":'client',
						"token":token
					}).then(function(success) {
						console.log('Client Charged');
						$state.go('stripe');
					}, function(error) {
						console.log('Charge Error');
					}); 
				}	

			}
		}
})();
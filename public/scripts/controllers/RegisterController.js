//Define Registration controller for RESTFUL API ngResource

(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('RegisterController', RegisterController);

		function RegisterController(stripe, users, $http, $scope) {

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

					/*
					$http.post('/api/subscribe', JSON.stringify(token)).
						success(function(data, status, headers, config) {
							console.log('Customer charged');
						}).error(function(data, status, headers, config) {
							console.log('Error charging customer');
						}); */

					//maintain stripe form $scope
					stripe.subscribe({
						"name":$scope.name,
						"email":$scope.email,
						"password":$scope.password,
						"subscriber":true,
						"role":'client',
						"token":token
					}).then(function(success) {
						console.log('Client Charged')
					}, function(error) {
						console.log('Charge Error');
					}); 
					//send Stripe to backend API to charge and
					//save new subscriber
				}	

					/*
					$http.post('/api/subscribe', JSON.stringify(token)).
						success(function(data, status, headers, config) {
							console.log('Customer charged');
						}).error(function(data, status, headers, config) {
							console.log('Error charging customer');
						});
					*/

					/*
					stripe.subscribe(token).then(function(success) {
						console.log("User added and charged");
					}, function(error) {
						console.log("Charge error");
					}); */
				
			}
		}
})();
(function() {

	'use strict';

	angular
		.module('workoutApp')
		.controller('ClientController', ClientController);

	//inject services into controller
		function ClientController(clientProgress, $scope, $rootScope, $state) {


			// Use require.js for client side node modules to work in browser
			//var d3 = require("node_modules/d3");
			//var jsdom = require("jsdom");
			if($rootScope.authenticated) {

			var vm = this;

			vm.clientReport = [];



			getClientProgress();

			getClientReport();

			function getClientProgress() {
				console.log("client controller");
			}

			function getClientReport() {
				console.log("get client data");
				var id = $rootScope.currentUser.id;
				var data = [];
				clientProgress.getClientInput(id).then(function(result) {
					data = result.data;
					vm.clientReport = data.listClientReport();
					console.log(vm.clientReport);
				}, function(error) {
					console.log(error);
				});
			}
		} else {
			console.log('Client Authentication error');
		}
	}
})();
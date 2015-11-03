(function() {

	'use strict';

	var workoutApp = angular
		.module('workoutApp')
		.controller('ClientController', ClientController);

	//inject services into controller
		function ClientController(clientProgress, $scope, $rootScope, $state, $window) {


			// Use require.js for client side node modules to work in browser
			//var d3 = require("node_modules/d3");
			//var jsdom = require("jsdom");
			if($rootScope.authenticated) {

			var vm = this;

			vm.clientReport = [];

			vm.clientChart = [];

			getClientReport();
			
			function getClientReport() {
				console.log("get client data");
				var id = $rootScope.currentUser.id;
				var data = [];
				clientProgress.getClientInput(id).then(function(result) {
					data = result.data;
					vm.clientReport = data.listClientReport();
					console.log(vm.clientReport);
					//send data to d3.js
					d3Library(vm.clientReport);
				}, function(error) {
					console.log(error);
				});
			}

			
			//function calls itself from getClientReport()
			//calls itself recursively
			function d3Library(data) {
				var tmp = [];
				var result, weight;

				angular.forEach(data, function(value) {
						result = value.progress;
					angular.forEach(result, function(value, key) {
						weight = value.weight
						// cast weight var as int 
						tmp.push(parseInt(weight));
					});
				}); 

					vm.clientChart = tmp;
					console.log("client chart");
					console.log(vm.clientChart);
					
				/*
				d3.select(".chart")
					.selectAll("div")
						.data(vm.clientChart)
					.enter().append("div")
						.style("width", function(d) { return d * 10 + "px"; })
						.text(function(d) {return d;}); 
					*/
			}


		} else {
			console.log('Client Authentication error');
		}
	}
})();
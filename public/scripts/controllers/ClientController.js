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

			
			//D3.js directive
			workoutApp.directive('linear-chart', function($window) {
				return {
					restrict: "EA",
					template: "<svg width='850' height='250'></svg>",
					link: function(scope, elm, attr) {
						var weightDataToPlot = vm.clientChart;
						var padding = 20;
						var pathClass = "path";
						var xScale, yScale, xAxisGen, yAxisGen, lineFun;

						var d3 = $window.d3;
						var rawSvg = elem.find("svg")[0];
						var svg = d3.select(rawSvg);

						//set D3.JS parameters
			function setChartParameters() {
				xScale = d3.scale.linear()
							.domain([weightDataToPlot[0].day, weightDataToPlot[weightDataToPlot.length - 1].day])
							.range([padding + 5, rawSvg.clientWidth - padding]);

				yScale = d3.scale.linear()
							.domain([0, d3.max(weightDataToPlot, function(d) {
								return d.weight;
							})])
							.range([rawSvg.clientHeight - padding, 0]);

				xAxisGen = d3.svg.axis()
							.scale(xScale)
							.orient("bottom")
							.ticks(weightDataToPlot - 1);

				yAxis = d3.svg.axis()
							.scale(yScale)
							.orient("left")
							.ticks(5);

				lineFun = d3.svg.line()
							.x(function (d) {
								return xScale(d.day);
							})
							.y(function (d) {
								return yScale(d.weight);
							})
							.interpolate("basis");
			}

			function drawLineChart() {

			setChartParameters();

			 svg.append("svg:g")
     		.attr("class", "x axis")
     		.attr("transform", "translate(0,180)")
     		.call(xAxisGen);

   			svg.append("svg:g")
      		.attr("class", "y axis")
      		.attr("transform", "translate(20,0)")
      		.call(yAxisGen);

   			svg.append("svg:path")
      		.attr({
        	d: lineFun(weightDataToPlot),
        	"stroke": "blue",
        	"stroke-width": 2,
        	"fill": "none",
        	"class": pathClass
   			});
		}

			drawLineChart();

		}
	};
});

		} else {
			console.log('Client Authentication error');
		}
	}
})();
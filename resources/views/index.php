<!doctype html>
<html ng-app="workoutApp">
	<head>
		<title>Workout App</title>
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
	</head>
	
	<!-- define angular controller -->
	<body ng-controller="WorkoutController as vm">

	<nav class="navbar navbar-default">
  			<div class="container-fluid">
    	<!-- Brand and toggle get grouped for better mobile display -->
    			<div class="navbar-header">
      				<button type="button" class="navbar-toggle collapsed" ng-click="isCollapsed = !isCollapsed">
        				<span class="sr-only">Toggle navigation</span>
        				<span class="icon-bar"></span>
        				<span class="icon-bar"></span>
        				<span class="icon-bar"></span>
      				</button>
      				<a class="navbar-brand" href="#">Workout App</a>
    			</div>
		<!-- Collect the nav links, forms, and other content for toggling -->
    			<div class="collapse navbar-collapse" collapse="isCollapsed">
      				<ul class="nav navbar-nav navbar-right">
      					<li><a href="#testRoute">Test</a></li>
        				<li><a href="#">Exercises</a></li>
        				<li><a href="#">Users</a></li>
        				<li><a href="#">Admin</a></li>
        				<li><a href="#">Analytics</a></li>
      				</ul>
    			</div><!-- /.navbar-collapse -->
  			</div><!-- /.container-fluid -->
	</nav>
		
		<!-- Main container and content with injected views -->
		<div id="container-fluid">
			
      <div class="container">
        <div class="row">
				  <h1>Welcome to the Fitness Admin Page</h1>
          <div ng-repeat="exercise in vm.exercises">
            <p>{{exercise.exercise}}</p>
          </div>
        </div>
      </div>






		</div> <!-- global container -->
	</body>
	
	<!-- Application Dependencies -->
    <script type="text/javascript" src="bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script type="text/javascript" src="bower_components/angular-resource/angular-resource.js"></script>
    <script type="text/javascript" src="bower_components/moment/moment.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-utils/ui-utils.js"></script>
    <script type="text/javascript" src="bower_components/angular-route/angular-route.js"></script>

    <!-- Application Scripts -->
    <script type="text/javascript" src="scripts/app.js"></script>
    <script type="text/javascript" src="scripts/controllers/WorkoutController.js"></script>
    <script type="text/javascript" src="scripts/services/workout.js"></script>
</html>






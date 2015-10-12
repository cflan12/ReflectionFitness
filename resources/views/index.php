<!doctype html>
<html ng-app="workoutApp">
	<head>
		<title>Reflection Fitness</title>
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
        <link rel="stylesheet" href="css/flaty_bootstrap.min.css">
        <link rel="stylesheet" href="css/theme.css">
	</head>
	
	<!-- define angular controller
	<body ng-controller="WorkoutController as vm"> -->
    <body>
		
		<!-- Main container and content with injected views -->
		<div class="container-fluid" id="container-fluid">
            
            <!-- ui-router view injection -->
            <div ui-view></div>
            <!-- Admin view, navbar injected first -->
            <div ui-view="adminNavbar"></div>
            <div ui-view="admin"></div>
            <!-- User profile, navbar injected first -->
            <div ui-view="userNavbar"></div>
            <div ui-view="profile"></div>
        
      
        </div> <!-- global container -->

        <footer>
            <h3 class="text-center">Reflection Fitness</h3>
            <h3 class="text-center">San Diego, CA</h3>
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <p>Sign-Up</p>
                    </div>
                    <div class="col-sm-4">
                        <p>Log In</p>
                    </div>
                    <div class="col-sm-4">
                        <p>Terms of Service</p>
                    </div>
                </div>
            </div>
        </footer>

	</body>
	
	<!-- Application Dependencies -->
    <script type="text/javascript" src="bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script type="text/javascript" src="bower_components/angular-resource/angular-resource.js"></script>
    <script type="text/javascript" src="bower_components/moment/moment.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-utils/ui-utils.js"></script>
    <script type="text/javascript" src="bower_components/angular-route/angular-route.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script type="text/javascript" src="bower_components/satellizer/satellizer.js"></script>
    <script type="text/javascript" src="node_modules/d3/d3.js"></script>
    <script type="text/javascript" src="lib/angular-payments/lib/angular-payments.min.js"></script>

    <!-- Application Scripts -->
    <script type="text/javascript" src="scripts/app.js"></script>

    <script type="text/javascript" src="scripts/controllers/WorkoutController.js"></script>
    <script type="text/javascript" src="scripts/controllers/AuthController.js"></script>
    <script type="text/javascript" src="scripts/controllers/UserController.js"></script>
    <script type="text/javascript" src="scripts/controllers/ClientController.js"></script>
    <script type="text/javascript" src="scripts/controllers/RegisterController.js"></script>

    <script type="text/javascript" src="scripts/services/workout.js"></script>
    <script type="text/javascript" src="scripts/services/users.js"></script>
    <script type="text/javascript" src="scripts/services/bodyweight.js"></script>
    <script type="text/javascript" src="scripts/services/rep.js"></script>
    <script type="text/javascript" src="scripts/services/cardio.js"></script>
    <script type="text/javascript" src="scripts/services/clientProgress.js"></script>
    <script type="text/javascript" src="scripts/services/stripe.js"></script>

    <!-- Stripe Integration -->
    <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
    <script>Stripe.setPublishableKey('pk_test_jSzRHK2cWmkIazJ511O8xeVM');</script>
</html>


















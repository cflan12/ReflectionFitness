<!doctype html>
<html ng-app="workoutApp">
	<head>
		<title>Reflection Fitness</title>
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
       <!-- <link rel="stylesheet" href="bower_components/bootstrap-material-design/dist/css/roboto.min.css">
        <link rel="stylesheet" href="bower_components/bootstrap-material-design/dist/css/material.min.css">
        <link rel="stylesheet" href="bower_components/bootstrap-material-design/dist/css/ripples.min.css"> -->
        <link rel="stylesheet" href="css/flaty_bootstrap.min.css">
        <link rel="stylesheet" href="css/theme.css">

        <!-- Font Awesome -->
        <link rel="stylesheet" href="lib/font-awesome-4.4.0/css/font-awesome.min.css">
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
        <div class="container-fluid pre-footer">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <p>Follow Us</p>
                        <span><i class="fa fa-facebook fa-2x"></i></span>
                        <span><i class="fa fa-twitter fa-2x"></i></span>
                        <span><i class="fa fa-instagram fa-2x"></i></span>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <h3 class="text-center">Reflection Fitness</h3>
            <div class="container">
                <div class="row text-center footer-links">
                    <div class="col-sm-4">
                        <a ui-sref="signup"><p>Sign-Up</p></a>
                    </div>
                    <div class="col-sm-4">
                        <a ui-sref="auth"><p>Log In</p></a>
                    </div>
                    <div class="col-sm-4">
                        <a ui-sref="terms"><p>Terms of Service</p></a>
                    </div>
                </div>
                <div class="row" style="margin-top:40px;">
                    <p class="text-right">
                        &copy; 2015 Reflection Fitness | Designed By <a href="http://www.copishboutique.com">Copish Boutique</a>
                    </p>
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
    <script type="text/javascript" src="bower_components/angular-payments/lib/angular-payments.min.js"></script>

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
    
    <!-- Use Arrive.js for Material Design JQuery requirement -->
    <script type="text/javascript" src="bower_components/arrive/minified/arrive.min.js"></script>

    <!-- Material Design
    <script src="bower_components/bootstrap-material-design/dist/js/material.min.js"></script> -->
</html>


















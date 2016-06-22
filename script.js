var app = angular.module("JoinOn", ["ngRoute", "firebase"]);

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    controller: "FeedCtrl",
    templateUrl: "templates/feed.html"
  })
  $routeProvider.when("/login", {
    controller: "LoginCtrl",
    templateUrl: "templates/login.html"
  })
  $routeProvider.when("/user", {
    controller: "UserCtrl",
    templateUrl: "templates/user.html"
  })
  $routeProvider.when("/create", {
    controller: "CreateCtrl"
    templateUrl: "templates/create.html"
  })
  $routeProvider.when("/project", {
    controller: "ProjectCtrl",
    templateUrl: "templates/project.html"
  })
});

app.controller("LoginCtrl", function($scope, $location, $firebaseAuth) {
  var auth = $firebaseAuth();

  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $location.path("/");
    }
  });

  $scope.signIn = function() {
    $scope.message = "";
    $scope.error = "";
    auth.$signInWithPopup("facebook")
      .catch(function(error) {
        $scope.error = error;
      });
  }
});

app.controller("FeedCtrl", function($scope, $location, $firebaseAuth) {
  var auth = $firebaseAuth();

  $scope.logout = function() 
  {
  	auth.$signOut();
  	$location.path("/login");
  }

});

app.controller("UserCtrl", function($scope, $location, $firebaseAuth) {
  var auth = $firebaseAuth();
});

app.controller("CreateCtrl", function($scope, $location, $firebaseAuth, $firebaseArray) {
  var auth = $firebaseAuth();
  var projectRef = firebase.database().ref().child("projects");
  $scope.projects = $firebaseArray(projectRef);
  

    $scope.addPJ = function() {

    $scope.errorMessage = "";
    
    if ($scope.projectName && $scope.projectSummary && $scope.projectCollaborators) {
      console.log($scope.projectName);
      $scope.project.$add($scope.projectName);
      $scope.projectName = {};
      
    } else {
      $scope.errorMessage = "Sorry, something went wrong--try submitting again and make sure all fields are complete."
    }
  }
  

  $scope.projectCollaborators 
  $scope.addPJ = function() {
    console.log($scope.();
  }



});

app.controller("ProjectCtrl", function($scope, $location, $firebaseAuth) {
  var auth = $firebaseAuth();
});

<script type="text/javascript">
  WebFontConfig = {
    google: { families: [ 'Abel::latin' ] }
  };
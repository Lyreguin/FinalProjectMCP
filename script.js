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
    controller: "CreateCtrl",
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

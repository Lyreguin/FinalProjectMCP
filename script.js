var app = angular.module("FinalProjectMCP", ["ngRoute", "firebase"]);
var FinalProjectMCP_TOKEN = "f444ad30cdb55c1a02f067643242cfba";

app.config(function($routeProvider) {
  // $routeProvider.when("/", {
  //   controller: "FeedCtrl",
  //   templateUrl: "templates/feed.html"
  // })
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

app.controller("FeedCtrl", function(
  $scope, $http, $location, $firebaseAuth, $firebaseArray, $timeout) {
  var auth = $firebaseAuth();
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      console.log(firebaseUser);
    } else {
      console.log(firebaseUser);
      $location.path("/login");
    }
  });

  $scope.logout = function() {
    auth.$signOut();
    $location.path("/login");
  }
});

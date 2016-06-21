var app = angular.module("FinalProjectMCP", ["ngRoute", "firebase"]);
var FinalProjectMCP_TOKEN = "f444ad30cdb55c1a02f067643242cfba";

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    controller: "FeedCtrl",
    templateUrl: "templates/feed.html"
  })
  $routeProvider.when("/login", {
    controller: "LoginCtrl",
    templateUrl: "templates/login.html"
  })
  $routeProvider.when("/create", {
    controller: "CreateCtrl",
    templateUrl: "templates/create.html"
  })
  $routeProvider.when("/project", {
    controller: "ProjectCtrl",
    templateUrl: "templates/project.html"
  })
  $routeProvider.when("/user", {
    controller: "UserCtrl",
    templateUrl: "templates/user.html"
  })
});

// - Redirect to Feed if I'm already logged in
// - Feed to redirect to login if I'm not logged in
// - Prevent me sending a prop to myself

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

app.controller("createPJCtrl", function($scope, $location, $firebaseAuth) {
  var auth = $firebaseAuth();


  // var propRef = firebase.database().ref().child("props");
  // var bruRef = firebase.database().ref().child("brus");
  // $scope.props = $firebaseArray(propRef);
  // $scope.brus = $firebaseArray(bruRef);
  // $scope.newProp = {};

  // When I send:
  // - Check sentiment API
  // - Make sure there's a prop
  // - Make sure I'm not the receiver

  // $scope.addProp = function() {
  //   $scope.successMessage = "";
  //   $scope.errorMessage = "";
  //   if ($scope.newProp.text && $scope.newProp.receiver) {
  //     console.log($scope.newProp);
  //     $scope.props.$add($scope.newProp);
  //     $scope.newProp = {};
  //     $scope.successMessage = "Nice! You contributed to the positivity of the world."
  //     $timeout(function() {
  //       $scope.successMessage = "";
  //     }, 3000);
  //   } else {
  //     $scope.errorMessage = "Please make sure to choose a receiver, and add some positive text!"
  //   }
  // }

  $scope.logout = function() {
    auth.$signOut();
    $location.path("/login");
  }
});
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

app.controller("FeedCtrl", function($scope, $location, $firebaseAuth, $firebaseArray, $firebaseObject) {
  var auth = $firebaseAuth();
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      console.log(firebaseUser);
    } 
    else {
      $location.path("/login");
    }
  });

  $scope.logout = function() {
  	auth.$signOut();
  	$location.path("/login");
  }

  //Feed Content
  var projRef = firebase.database().ref().child("projects");



});

app.controller("UserCtrl", function($scope, $location, $firebaseAuth) {
  var auth = $firebaseAuth();
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      console.log(firebaseUser);
    } 
    else {
      $location.path("/login");
    }
  });

  $scope.logout = function() {
  	auth.$signOut();
  	$location.path("/login");
  }
});

app.controller("CreateCtrl", function($scope, $location, $firebaseAuth, $firebaseArray) {
  var auth = $firebaseAuth();
 	var userID = "";
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      console.log(firebaseUser);
      userID = firebaseUser.uid;
      console.log(userID);
    } 
    else {
      $location.path("/login");
    }
  });
  $scope.logout = function() {
  	auth.$signOut();
  	$location.path("/login");
  }

  var projRef = firebase.database().ref().child("projects");
  $scope.projects = $firebaseArray(projRef);
  $scope.newProj = {};
  

  $scope.addProj = function() {
  	if ($scope.newProj.name && $scope.newProj.text) {
  		$scope.newProj.uid = userID;
      console.log($scope.newProj);
      $scope.projects.$add($scope.newProj);
  	}
  }
});

app.controller("ProjectCtrl", function($scope, $location, $firebaseAuth) {
  var auth = $firebaseAuth();
  auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      console.log(firebaseUser);
    } 
    else {
      $location.path("/login");
    }
  });

  $scope.logout = function() {
  	auth.$signOut();
  	$location.path("/login");
  }
});

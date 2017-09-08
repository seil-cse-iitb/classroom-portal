angular.module('myapp')
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/home.html",
        controller : "HomeCtrl"
    })
    .when("/205", {
        templateUrl : "templates/205.html",
        controller : "205Ctrl"
    })
    .when("/login", {
        templateUrl : "templates/login.html",
        controller: "LoginCtrl"
    })
    .otherwise({
        redirectTo: '/'
    });
});
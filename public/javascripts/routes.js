angular.module('myapp')
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/home.html"
    })
    .when("/201", {
        templateUrl : "templates/201.html",
        controller : "201Ctrl"
    })
    .when("/green", {
        templateUrl : "templates/green.html"
    })
    .when("/blue", {
        templateUrl : "templates/blue.html"
    })
    .otherwise({
        templateUrl : "templates/home.html"
    });
});
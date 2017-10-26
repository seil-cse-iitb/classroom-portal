var API_ROOT = "/api/"
angular.module('myapp')

.controller('HomeCtrl', function($scope,$http, Auth, $window, $location) {
    Auth.loginRequired();
    $scope.logout = function(){
        $window.localStorage.removeItem('satellizer_token');
        $location.path('/login');
    }
})
.controller('205Ctrl', function($scope, $http, Auth, $window, $location){
	Auth.loginRequired();
	$scope.changeState = function(appliance, state){
		var state_string = state? "on" : "off";
		$http.get(API_ROOT+"control/205/"+appliance+"/"+state_string);
	}
    $scope.logout = function(){
        $window.localStorage.removeItem('satellizer_token');
        $location.path('/');
    }
})
.controller('LoginCtrl',['$scope','$window','$http','$location','$auth',function($scope,$window,$http,$location,$auth){
    $scope.login=function(){
        $http.post('/auth/authenticate', $scope.user).then(function(response){
            $window.localStorage.setItem('satellizer_token', response.data.token);
            $location.path('/');
        }, function(response){
            alert(response.data.message);
        });
    }
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(response) {
        // Signed in with IITBSSO.
        $location.path('/');
      })
      .catch(function(response) {
        // Something went wrong.
        alert(response.data.message);
      });
    };
}])

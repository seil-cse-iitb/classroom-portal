var API_ROOT = "/api/"
angular.module('myapp')

.controller('HomeCtrl', function($scope,$http) {
  $http.get(API_ROOT+'channels').then(function(res){
  	$scope.channels = res.data;
  })
})
.controller('201Ctrl', function($scope, $http){
	// $scope.switch={
	// 	light:false,
	// 	fan:false,
	// 	ac:false,

	// 	changeLight:function(){
			
	// 	}
	// }
	$scope.changeState = function(appliance, state){
		var state_string = state? "on" : "off";
		$http.get(API_ROOT+"205/"+appliance+"/"+state_string);
	}
})
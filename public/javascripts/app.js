angular.module('myapp', ['ngMaterial','ngRoute','ngResource'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('blue')
    .dark();
})
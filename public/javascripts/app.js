angular.module('myapp', ['ngMaterial','ngRoute','ngResource','angular-jwt','satellizer'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('blue')
    .dark();
})
.config(function Config($httpProvider, jwtOptionsProvider) {
	jwtOptionsProvider.config({
	  tokenGetter: ['options', function(options) {
	    // Skip authentication for any requests ending in .html
	    if (options.url.substr(options.url.length - 5) == '.html') {
	      return null;
	    }

	    return localStorage.getItem('satellizer_token');
	  }]
	});

	$httpProvider.interceptors.push('jwtInterceptor');
})
.config(function($authProvider){
	$authProvider.oauth2({
      name: 'iitbsso',
      url: '/auth/provider',
      clientId: 'HkRquN6lSDR8HFIAwclxuznLQjjMmAuNUJp3G7pQ',
      redirectUri: window.location.origin,
      authorizationEndpoint: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize',
      optionalUrlParams: ['scope'],
      scope:['ldap'],
      scopePrefix:'',
      scopeDelimiter: ' '
    });
})
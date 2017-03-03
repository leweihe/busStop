'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'myApp-home',
    'myApp-manageRoute',
    'myApp-manageStation'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    // $locationProvider.hashPrefix('!');

    // $routeProvider.otherwise({redirectTo: '/manage-route'});
}]);

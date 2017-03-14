'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'myApp-home',
    'myApp-manageRoute',
    'myApp-manageStation',
    'myApp-bot-api'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

}]);

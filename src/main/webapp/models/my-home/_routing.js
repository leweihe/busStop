'use strict';

angular.module('myApp-home').config(function ($stateProvider) {
    $stateProvider.state('home', {
        templateUrl: 'models/my-home/home.html',
        url: '/home',
        controller: 'HomeController'
    });
});

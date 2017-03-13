'use strict';

angular.module('myApp-bot-api').config(function ($stateProvider) {
    $stateProvider.state('home', {
        templateUrl: 'models/my-bot-api/home.html',
        url: '/home',
        controller: 'HomeController'
    });
});

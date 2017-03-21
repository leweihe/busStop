'use strict';

angular.module('myApp-home-api').config(function ($stateProvider) {
    $stateProvider.state('home-api', {
        templateUrl: 'models/my-home/home-api.html',
        url: '/home-api',
        controller: 'HomeApiController'
    });
});

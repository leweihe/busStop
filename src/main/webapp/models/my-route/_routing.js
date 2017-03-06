'use strict';

angular.module('myApp-manageRoute').config(function ($stateProvider) {
    $stateProvider.state('manageRoute', {
        url:'/manage-route',
        templateUrl: 'models/my-route/manage-route.html',
        controller: 'ManageRouteController'
    });
});

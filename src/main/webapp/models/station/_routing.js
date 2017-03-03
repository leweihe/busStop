'use strict';

angular.module('myApp-manageStation').config(function ($stateProvider) {
    $stateProvider
        .state('manageStation', {
            url: '/manage-station/:routeId',
            templateUrl: 'models/station/manage-station.html',
            controller: 'ManageStationController'
        });
});

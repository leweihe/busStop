/**
 * Created by cn40580 at 2016-10-12 10:04 AM.
 */
'use strict';

angular.module('myApp.manageStation', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/manageStation', {
            templateUrl: 'models/manageStation/manageStation.html',
            controller: 'manageStationCtrl'
        });
    }])
    .controller('manageStationCtrl', ['$scope', 'ManageStationService', function ($scope, ManageStationService) {

    }]).factory('ManageStationService', ['$http', function ($http) {
    return {
        findAllBusRoute: function () {
            var promise = $http.get('app/rest/busroute/all').then(function (data) {
                return data;
            });
            return promise;
        },
        findAllBusStation: function () {
            var promise = $http.get('app/rest/busstation/all').then(function (data) {
                return data;
            });
            return promise;
        }
    }
}]);
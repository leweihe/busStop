'use strict';

angular.module('myApp.manageStation', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/manage-station', {
            templateUrl: 'models/station/manage-station.html',
            controller: 'ManageStationController'
        });
    }])

    .controller('ManageStationController', ['$scope', 'ManageStationService', function ($scope, ManageRouteService) {


    }]).factory('ManageStationService', ['$http', '$resource', function ($http, $resource) {
    var BusStation = $resource('app/rest/busstation/save', {}, {
        save: {method: 'POST', cache: true}
    });
    return {
        findAllBusStation: function () {
            var promise = $http.get('app/rest/busstation/all').then(function (data) {
                return data;
            });
            return promise;
        },
        findAllBusStationByRouteId: function (routeId) {
            var promise = $http.get('app/rest/busstation/:routeId', {
                params: {
                    routeId: routeId
                }
            }).then(function (data) {
                return data;
            });
            return promise;
        },

        saveBusStation: function (busRoute) {
            var resource = new BusStation();
            resource.keyword = busRoute.keyword;
            resource.city = busRoute.city === '' ? '厦门' : busRoute.city;
            return resource.$save();
        },
        removeStation: function (stationId) {
            return $resource('app/rest/busroute/remove/:stationId', {stationId: stationId}).delete().$promise;
        }
    }
}]);
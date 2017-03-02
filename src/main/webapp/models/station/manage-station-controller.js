'use strict';

angular.module('myApp.manageStation', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/manage-station', {
            templateUrl: 'models/station/manage-station.html',
            controller: 'ManageStationController'
        });
    }])

    .controller('ManageStationController', ['$scope', 'ManageStationService', function ($scope, ManageRouteService) {

        var map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom: 14,
            center: [118.139839, 24.488006]
        });

        $scope.setMapStyle = function (mapStyle) {
            map.setMapStyle(mapStyle);
        };

        ManageRouteService.findAllBusRoute().then(function (allBusRoutes) {
            $scope.allBusRoutes = allBusRoutes.data;
        });

        $scope.doSearchDrivingPath = function (route) {
            AMap.plugin('AMap.Driving', function () {
                var drving = new AMap.Driving({
                    map: map
                });
                drving.search(route.stations);
            });
        };

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
        }
    }
}]);
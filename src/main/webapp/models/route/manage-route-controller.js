'use strict';

angular.module('myApp.manageRoute', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/manage-route', {
            templateUrl: 'models/route/manage-route.html',
            controller: 'ManageRouteController'
        });
    }])

    .controller('ManageRouteController', ['$scope', 'ManageRouteService', function ($scope, ManageRouteService) {

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

        $scope.$on("refreshRoutes", function() {
            ManageRouteService.findAllBusRoute().then(function (allBusRoutes) {
                $scope.allBusRoutes = allBusRoutes.data;
            });
        });

        $scope.searchInAmap = function (route) {
            AMap.plugin('AMap.Driving', function () {
                var driving = new AMap.Driving({
                    map: map
                });
                driving.search(route.stations);
            });
        };

        $scope.listStations = function (route) {
            $scope.stations = route.stations;
        };

        $scope.editRouteInfo = function (route) {
            $scope.stations = route.stations;
        };

        $scope.saveBusRoute = function () {
            if ($scope.inputBusRoute) {
                ManageRouteService.saveBusRoute($scope.inputBusRoute).then(function (route) {
                    $scope.$broadcast("refreshRoutes");
                });
            }
        };

    }]).factory('ManageRouteService', ['$http', function ($http) {
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
        },
        saveBusRoute: function (busRoute) {
            var promise = $http.post('app/rest/busroute/save', {
                params: {
                    busRoute: busRoute
                }
            }).then(function (data) {
                return data;
            });
            return promise;
        }
    }
}]);
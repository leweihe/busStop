'use strict';

angular.module('myApp.manageRoute', ['ngRoute', 'ngResource'])

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

        $scope.removeRoute = function (route) {
            if (route.routeId) {
                ManageRouteService.removeRoute(route.routeId).then(function () {
                    $scope.$broadcast("refreshRoutes");
                });
            }
        };

    }]).factory('ManageRouteService', ['$http', '$resource', function ($http, $resource) {
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
            var resource = $resource('app/rest/busroute/save');
            resource.description = busRoute.description;
            resource.routeName = busRoute.routeName;
            return resource.save().$promise;
        },
        removeRoute: function (routeId) {
            return $resource('app/rest/busroute/remove/:routeId', {routeId: routeId}).delete().$promise;
        }
    }
}]);
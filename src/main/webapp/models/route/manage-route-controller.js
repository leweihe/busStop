'use strict';

angular.module('myApp-manageRoute', ['base'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/manage-route', {
            templateUrl: 'models/route/manage-route.html',
            controller: 'ManageRouteController'
        });
    }])

    .controller('ManageRouteController', ['$scope', '$state', 'ManageRouteService', 'ManageStationService', function ($scope, $state, ManageRouteService, ManageStationService) {

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
            if (route.routeId) {
                ManageStationService.findAllBusStationByRouteId(route.routeId)
                    .then(function (data) {
                        AMap.plugin('AMap.Driving', function () {
                            var driving = new AMap.Driving({
                                map: map
                            });
                            driving.search(data.data);
                        });
                });
            }
        };

        $scope.listStations = function (route) {
            $scope.stations = route.stations;
            $scope.routeId = route.routeId;
        };

        $scope.editRouteInfo = function (route) {
            $scope.stations = route.stations;
        };

        $scope.saveBusRoute = function () {
            if ($scope.inputBusRoute) {
                ManageRouteService.saveBusRoute($scope.inputBusRoute).then(function () {
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

        $scope.jumpToStationEditPage = function () {
            $state.go('manageStation', {routeId: $scope.routeId});
        }

    }]).factory('ManageRouteService', ['$http', '$resource', function ($http, $resource) {
    var BusRoute = $resource('app/rest/busroute/save', {}, {
        save: {method: 'POST', cache: true}
    });
    return {
        findAllBusRoute: function () {
            var promise = $http.get('app/rest/busroute/all').then(function (data) {
                return data;
            });
            return promise;
        },
        saveBusRoute: function (busRoute) {
            var resource = new BusRoute();
            resource.description = busRoute.description;
            resource.routeName = busRoute.routeName;
            return resource.$save();
        },
        removeRoute: function (routeId) {
            return $resource('app/rest/busroute/remove/:routeId', {routeId: routeId}).delete().$promise;
        }
    }
}]);
'use strict';

angular.module('myApp-manageRoute').controller('ManageRouteController', ['$scope', '$state', 'ManageRouteService', 'ManageStationService', function ($scope, $state, ManageRouteService, ManageStationService) {

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

    $scope.$on("refreshRoutes", function () {
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
                        driving.search(data);
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

}]);
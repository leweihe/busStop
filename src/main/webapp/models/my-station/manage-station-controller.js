'use strict';

angular.module('myApp-manageStation').controller('ManageStationController', ['$scope', '$stateParams', 'ManageStationService',
    function ($scope, $stateParams, ManageStationService) {

        $scope.routeId = $stateParams.routeId;
        var map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom: 14,
            center: [118.139839, 24.488006]
        });

        ManageStationService.findAllBusStationByRouteId($scope.routeId).then(function (allBusStations) {
            $scope.allBusStations = allBusStations;
        });

        $scope.addBusStation = function () {
            $scope.inputBusStation.routeId = $scope.routeId;
            ManageStationService.saveBusStation($scope.inputBusStation).then(function (data) {
                $scope.$broadcast("refreshStations");
            });
        };

        $scope.$on("refreshStations", function () {
            ManageStationService.findAllBusStationByRouteId($scope.routeId).then(function (allBusStations) {
                $scope.allBusStations = allBusStations;
            });
        });

        $scope.deleteBusStation = function (stationId) {
            ManageStationService.removeStation($scope.routeId, stationId);
            $scope.$broadcast("refreshStations");
        };

        ManageStationService.initTipInput(map);

    }

]);
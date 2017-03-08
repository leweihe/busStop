'use strict';

angular.module('myApp-manageStation').controller('ManageStationController', ['$rootScope', '$scope', '$stateParams', 'ManageStationService', 'AmapService',
    function ($rootScope, $scope, $stateParams, ManageStationService, AmapService) {
        $scope.routeId = $stateParams.routeId;
        $scope.inputBusStation = {
            routeId: '',
            lng: '',
            lat: '',
            keyword: '',
            description: ""
        };
        $scope.inputBusStation.routeId = $scope.routeId;
        var amapRoute;

        $scope.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom: 14,
            center: [118.139839, 24.488006]
        });


        ManageStationService.findAllBusStationByRouteId($scope.routeId).then(function (allBusStations) {
            $scope.allBusStations = allBusStations;
            var path = [];
            angular.forEach(allBusStations, function (station) {
                path.push([station.lng, station.lat]);
            });
            $scope.map.plugin("AMap.DragRoute", function () {
                amapRoute = new AMap.DragRoute($scope.map, path, AMap.DrivingPolicy.LEAST_DISTANCE);
                amapRoute.search();
            });
        });

        $scope.addBusStation = function () {
            ManageStationService.saveBusStation($scope.inputBusStation).then(function () {
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

        AmapService.initTipInput($scope.map);

        $scope.$on('openInfoPoint', function (ev, point) {
            $scope.openInfoPoint($scope.map, point);
        });

        $scope.openInfoPoint = function (map, point) {
            map.clearMap();
            var marker = new AMap.Marker({
                map: map,
                position: point.location,
                draggable: true
            });

            marker.on('dragend', function (dragedPoint) {
                $scope.inputBusStation.lng = dragedPoint.lnglat.lng;
                $scope.inputBusStation.lat = dragedPoint.lnglat.lat;
            });

            $scope.inputBusStation.lng = point.location.lng;
            $scope.inputBusStation.lat = point.location.lat;
        };

        $scope.drawStationPoint = function (station) {
            station.routeId = $scope.routeId;
            var position = new AMap.LngLat(station.lng, station.lat);
            var marker = new AMap.Marker({
                map: $scope.map,
                position: position,
                draggable: true
            });
            marker.on('dragend', function (dragedPoint) {
                station.lng = dragedPoint.lnglat.lng;
                station.lat = dragedPoint.lnglat.lat;
            });
            marker.on('dblclick', function () {
                marker.setMap(null);
                ManageStationService.saveBusStation(station);
            })
        };

        $scope.openInfoWin = function (map, point) {
            var info = [];
            info.push('<div><img src="images/linde-logo.jpg" width="100"><br/> ');
            info.push(point.name);
            info.push('地址 : ' + point.district + point.address + '</div>');

            var infoWindow = new AMap.InfoWindow({
                content: info.join("")
            });
            $scope.inputBusStation.lng = point.location.lng;
            $scope.inputBusStation.lat = point.location.lat;

            infoWindow.open(map, [point.location.lng, point.location.lat]);
        }
    }

]);
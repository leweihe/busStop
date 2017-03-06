'use strict';

angular.module('myApp-manageStation').controller('ManageStationController', ['$rootScope', '$scope', '$stateParams', 'ManageStationService', 'AmapService',
    function ($rootScope, $scope, $stateParams, ManageStationService, AmapService) {

        $scope.routeId = $stateParams.routeId;
        $scope.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom: 14,
            center: [118.139839, 24.488006]
        });

        ManageStationService.findAllBusStationByRouteId($scope.routeId).then(function (allBusStations) {
            $scope.allBusStations = allBusStations;
        });

        $scope.addBusStation = function () {
            $scope.inputBusStation.routeId = $scope.routeId;
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
            var marker = new AMap.Marker({
                map: map,
                position: point.position,
                offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
                draggable: true,
                content: '<div class="marker-route marker-marker-bus-from"></div>'   //自定义点标记覆盖物内容
            });

            marker.on();

            $scope.inputBusStation.lng = point.location.lng;
            $scope.inputBusStation.lat = point.location.lat;

            infoWindow.open(map, [point.location.lng, point.location.lat]);
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
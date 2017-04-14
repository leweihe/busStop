'use strict';

angular.module('myApp-manageStation').controller('ManageStationController', ['$rootScope', '$scope', '$stateParams', 'ManageStationService', 'ManageRouteService', 'AmapService',
    function ($rootScope, $scope, $stateParams, ManageStationService, ManageRouteService, AmapService) {
        $scope.routeId = $stateParams.routeId;
        $scope.inputBusStation = {
            routeId: '',
            lng: '',
            lat: '',
            keyword: '',
            description: '',
            stationPic: '',
            sequence: 0,
            tripFlag: ''
        };

        var comingPolyOptions = {
            strokeColor: '#3366FF',   // 线颜色
            strokeOpacity: 1,         // 线透明度
            strokeWeight: 3,          // 线宽
            strokeStyle: 'solid',     // 线样式
            isOutline: false
        };

        $scope.inputBusStation.routeId = $scope.routeId;
        var amapRoute;

        $scope.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom: 14,
            center: [118.139839, 24.488006]
        });

        var defaultMarkerOpt = {icon: 'images/circle-red.png', offset: new AMap.Pixel(-8, -8)};

        var editMarkerOpt = {icon: 'images/drag-circle.png', offset: new AMap.Pixel(-8, -8), draggable: true};

        var markerOptions = {
            polyOptions: comingPolyOptions,
            startMarkerOptions: defaultMarkerOpt,
            midMarkerOptions: defaultMarkerOpt
        };

        ManageRouteService.findRouteById($scope.routeId).then(function (currentRoute) {
            $scope.currentRoute = currentRoute.data;
        });

        $scope.reloadMap = function() {
            $scope.map.clearMap();
            ManageStationService.findAllBusStationByRouteId($scope.routeId).then(function (allBusStations) {
                $scope.allBusStations = allBusStations;
                var path = [];
                angular.forEach(allBusStations, function (station) {
                    path.push([station.lng, station.lat]);
                });
                $scope.map.plugin('AMap.DragRoute', function () {
                    amapRoute = new AMap.DragRoute($scope.map, path, AMap.DrivingPolicy.LEAST_DISTANCE, markerOptions);
                    amapRoute.search();
                });
            });
        };

        $scope.reloadMap();

        $scope.addBusStation = function () {
            $scope.inputBusStation.tripFlag = $scope.currentRoute.tripFlag;
            ManageStationService.saveBusStation($scope.inputBusStation).then(function () {
                $scope.$broadcast('refreshStations');
            });
        };

        $scope.onComplete = function (data) {
            $scope.inputBusStation.lng = data.position.getLng();
            $scope.inputBusStation.lat = data.position.getLat();
            ManageStationService.saveBusStation($scope.inputBusStation).then(function () {
                $scope.$broadcast('refreshStations');
            });
        };

        $scope.onError = function(data) {

        };

        $scope.addBusStationByCurrent = function() {
            $scope.map.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    timeout: 10000,
                    zoomToAccuracy: true,
                    buttonPosition: 'RB'
                });
                $scope.map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', $scope.onComplete);
                AMap.event.addListener(geolocation, 'error', $scope.onError);
            });
        };

        $scope.$on('refreshStations', function () {
            ManageStationService.findAllBusStationByRouteId($scope.routeId).then(function (allBusStations) {
                $scope.allBusStations = allBusStations;
            }).then(function () {
                $scope.reloadMap();
            });
        });

        $scope.deleteBusStation = function (stationId) {
            ManageStationService.removeStation($scope.routeId, stationId);
            $scope.$broadcast('refreshStations');
        };

        AmapService.initTipInput($scope.map);

        $scope.$on('openInfoPoint', function (ev, point) {
            $scope.openInfoPoint($scope.map, point);
        });

        $scope.openInfoPoint = function (map, point) {
            map.clearMap();
            defaultMarkerOpt.map = $scope.map;
            var marker = new AMap.Marker(defaultMarkerOpt);

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
            editMarkerOpt.position = position;
            editMarkerOpt.map = $scope.map;
            var marker = new AMap.Marker(editMarkerOpt);
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
                content: info.join('')
            });
            $scope.inputBusStation.lng = point.location.lng;
            $scope.inputBusStation.lat = point.location.lat;

            infoWindow.open(map, [point.location.lng, point.location.lat]);
        };

        $scope.saveBusRoute = function () {
            if ($scope.currentRoute) {
                ManageRouteService.saveBusRoute($scope.currentRoute).then(function () {
                    $scope.$broadcast('refreshRoutes');
                });
            }
        };

        ManageRouteService.findTripFlagValues().then(function (tripFlags) {
            $scope.tripFlags = tripFlags;
            tripFlags.forEach(function (flag) {
                if($scope.currentRoute.tripFlag.name === flag.name) {
                    $scope.currentRoute.tripFlag = flag;
                }
            });
            $scope.currentRoute.tripFlag = tripFlags[0];
        });

        ManageRouteService.findAllBusRoute().then(function (activeRoutes) {
            $scope.activeRoutes = activeRoutes.data;
            $scope.activeRoutes.forEach(function (route) {
                if($scope.currentRoute.oppRouteId === route.routeId){
                    $scope.currentRoute.oppRoute = route;
                }
            });
        });
    }

]);

/**
 * Created by cn40580 at 2017-03-06 2:43 PM.
 */
'use strict';

angular.module('myApp-bot-api').controller('BotApiController', ['$scope', '$location', '$stateParams', '$state', 'BotApiService', 'AmapService', 'ManageRouteService',
    function ($scope, $location, $stateParams, $state, BotApiService, AmapService, ManageRouteService) {

        var TRIP_FLAG_GO = 'GO';
        $scope.tripFlag = TRIP_FLAG_GO;

        var passedDefaultMarkerOpt = {icon: 'images/path-gray.png', offset: new AMap.Pixel(-16, -32), draggable: false};
        var passedEndMarkerOpt = {icon: 'images/hidden-point.png', offset: new AMap.Pixel(-16, -32), draggable: false};
        var comingDefaultMarkerOpt = {icon: 'images/path-blue.png', offset: new AMap.Pixel(-16, -32), draggable: false};
        var keyMarkerOpt = {icon: 'images/start-point.png', offset: new AMap.Pixel(-16, -32), draggable: false};

        var passedPolyOptions = {
            strokeColor: '#828282',   // 线颜色
            strokeOpacity: 1,         // 线透明度
            strokeWeight: 4,          // 线宽
            strokeStyle: 'solid',     // 线样式
            isOutline: false
        };

        var comingPolyOptions = {
            strokeColor: '#3366FF',   // 线颜色
            strokeOpacity: 1,         // 线透明度
            strokeWeight: 4,          // 线宽
            strokeStyle: 'solid',     // 线样式
            isOutline: false
        };

        var passedMarkerOptions = {
            polyOptions: passedPolyOptions,
            startMarkerOptions: passedDefaultMarkerOpt,
            midMarkerOptions: passedDefaultMarkerOpt,
            endMarkerOptions: passedEndMarkerOpt,
            showTraffic: false
        };

        var comingMarkerOptions = {
            polyOptions: comingPolyOptions,
            startMarkerOptions: keyMarkerOpt,
            midMarkerOptions: comingDefaultMarkerOpt,
            endMarkerOptions: keyMarkerOpt
        };

        if ($location.search().lng && $location.search().lat) {
            $scope.lng = $location.search().lng;
            $scope.lat = $location.search().lat;
            $scope.routeId = $location.search().routeId;
            $scope.stationId = $location.search().stationId;
        }

        if ($stateParams.lng && $stateParams.lat) {
            $scope.lng = $stateParams.lng;
            $scope.lat = $stateParams.lat;
        }

        if($stateParams.route || $stateParams.station) {
            $scope.route = $stateParams.route;
            $scope.stations = $scope.route.stations;
            $scope.station = $stateParams.station;
        }

        ManageRouteService.findAllBusRouteByTripFlag('GO').then(function (result) {
            $scope.routes = result.data;

            if($scope.routeId && $scope.stationId) {
                $scope.routes.forEach(function (route) {
                    if (route.routeId === $scope.routeId) {
                        route.isHighlight = true;
                        $scope.route = route;
                        route.stations.forEach(function (station) {
                            if (station.id === $scope.stationId) {
                                station.isHighlight = true;
                                $scope.station = station;
                            }
                        });
                        $scope.stations = route.stations;
                    }
                });
            }
        });

        $scope.jumpToListPage = function (route) {
            $state.go('bot-api', {route: route});
        };

        $scope.showSideBar = function () {
            $('#sideBar').attr('style', 'display:block');
            $('body').attr('class', 'with-panel-left-reveal');
        };

        $scope.hideSideBar = function () {
            $('#sideBar').attr('style', '');
            $('body').attr('class', '');
        };

        $scope.doSearch = function () {
            var route = $scope.route;
            if ($scope.station) {
                $scope.msg = '[' + route.routeName + '] - [' + $scope.station.keyword + ']';
            } else {
                $scope.msg = '[' + route.routeName + ']';
            }

            var passedPath = [];
            var comingPath = [];
            var flag = true;
            angular.forEach(route.stations, function (station, index) {
                if ($scope.station) {
                    flag = flag && !(station.id === $scope.station.id);
                } else {
                    flag = false;
                }

                if (flag) {
                    passedPath.push([station.lng, station.lat]);
                } else {
                    comingPath.push([station.lng, station.lat]);
                }
            });

            if (passedPath && passedPath.length > 0 && comingPath && comingPath.length > 0) {
                passedPath.push(comingPath[0]);
            }

            $scope.map.plugin('AMap.DragRoute', function () {
                route = new AMap.DragRoute($scope.map, comingPath, AMap.DrivingPolicy.LEAST_DISTANCE,
                    $scope.tripFlag === TRIP_FLAG_GO ? comingMarkerOptions : passedMarkerOptions);
                route.search();
            });

            $scope.map.plugin('AMap.DragRoute', function () {
                route = new AMap.DragRoute($scope.map, passedPath, AMap.DrivingPolicy.LEAST_DISTANCE,
                    $scope.tripFlag === TRIP_FLAG_GO ? passedMarkerOptions : comingMarkerOptions);
                route.search();
            });

            if ($scope.station) {
                var defaultWalkingOpt = {
                    map: $scope.map,
                    isOutline: false,
                    hideMarkers: true
                };

                var search = new AMap.Walking(defaultWalkingOpt);
                var fromLnglat = new AMap.LngLat($scope.lng, $scope.lat);
                var toLngLat = new AMap.LngLat($scope.station.lng, $scope.station.lat);
                search.search(fromLnglat, toLngLat);
            }
        };

        if ($stateParams.showMap) {
            $scope.map = new AMap.Map('mapContainer', {
                resizeEnable: true,
                zoom: 14,
                center: [118.139839, 24.488006]
            });

            $scope.map.plugin(['AMap.ToolBar'], function () {
                $scope.map.addControl(new AMap.ToolBar());
            });

            $scope.doSearch();
        }

    }]);

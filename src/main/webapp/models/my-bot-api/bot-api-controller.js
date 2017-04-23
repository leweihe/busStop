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
        }

        if ($stateParams.lng && $stateParams.lat) {
            $scope.lng = $stateParams.lng;
            $scope.lat = $stateParams.lat;
        }

        var buildTitle = function() {
            if ($scope.station) {
                $scope.title = '[' + $scope.route.routeName + ' - ' + $scope.route.description + '] - [' + $scope.station.keyword + ']';
            } else if ($scope.route) {
                $scope.title = '[' + $scope.route.routeName + ' - ' + $scope.route.description + ']';
            } else {
                $scope.title = '';
            }
        };

        if ($location.search().routeId || $location.search().stationId || $location.search().showMap) {
            $scope.routeId = $location.search().routeId;
            $scope.stationId = $location.search().stationId;
            $scope.showMap = $location.search().showMap;
        }

        if ($stateParams.route || $stateParams.station) {
            $scope.route = $stateParams.route;
            $scope.stations = $scope.route.stations;
            $scope.station = $stateParams.station;
            $scope.showMap = $stateParams.showMap;
            buildTitle();
        }

        ManageRouteService.findAllBusRouteByTripFlag('GO').then(function (result) {
            $scope.routes = result.data;

            if ($scope.routeId) {
                $scope.routes.forEach(function (route) {
                    if (route.routeId === $scope.routeId) {
                        route.isHighlight = true;
                        $scope.route = route;
                        route.stations.forEach(function (station) {
                            if (station.id === $scope.stationId) {
                                station.isHighlight = true;
                                if ($scope.stationId) {
                                    $scope.station = station;
                                }
                            }
                        });
                        $scope.stations = route.stations;
                        buildTitle();
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

            if ($scope.station && $scope.lng && $scope.lat) {
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

        if ($scope.showMap) {
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

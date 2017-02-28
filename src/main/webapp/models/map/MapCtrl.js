'use strict';

angular.module('myApp.map', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'models/map/map.html',
            controller: 'MapCtrl'
        });
    }])

    .controller('MapCtrl', ['$scope', 'ManageStationService', function ($scope, ManageStationService) {

        var map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom: 14,
            center: [118.139839, 24.488006]
        });

        $scope.setMapStyle = function (mapStyle) {
            map.setMapStyle(mapStyle);
        };

        $scope.doSearchDrivingPath = function () {
            ManageStationService.findAllBusStation().then(function (stations) {
                AMap.plugin('AMap.Driving', function () {
                    var drving = new AMap.Driving({
                        map: map
                    });
                    drving.search(stations.data);
                });
            });
        };

    }]);
/**
    * Created by cn40580 at 2017-03-06 2:43 PM.
    */

angular.module('myApp-home').controller('HomeController', ['$scope', 'HomeService', 'AmapService', 'ManageRouteService', function ($scope, HomeService, AmapService, ManageRouteService) {

    $scope.inputBusStation = {
        lng: "",
        lat: ""
    };
    $scope.map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom: 14,
        center: [118.139839, 24.488006]
    });

    $("#tipinput").click(function(){
        $("#searchTitle1").animate({height:'hide'});
        $("#searchTitle2").animate({height:'hide'});
    });

    $scope.map.plugin(["AMap.ToolBar"], function () {
        $scope.map.addControl(new AMap.ToolBar());
    });

    $scope.inputKeyword = "";

    $scope.searchNearestStations = function() {
        if(!$scope.inputBusStation.lng) {
            return;
        }
        console.log('[' + $scope.inputBusStation.lng + ', ' + $scope.inputBusStation.lat + ']');
        HomeService.findStationsInCircle($scope.circle).then(function(stations){
            if(stations.length <= 0) {
                console.log('no station in the circle suggest user to enlarge the r and search again.');
                return;
            }
            var originals = [];
            angular.forEach(stations, function(station) {
                originals.push({lng: station.lng, lat: station.lat});
            });
            var destination = {lng: $scope.inputBusStation.lng, lat: $scope.inputBusStation.lat};

            AmapService.calcWalkDist(originals, destination).then(function(distResults){

                var shortestInd = 0;
                var shortestDist = 0;
                var tmpDist = 0;
                angular.forEach(distResults, function(dist, index){
                    console.log('@ ' + dist.distance + '');
                    if(index == 0) {
                        shortestDist = parseFloat(dist.distance);
                    }
                    tmpDist = parseFloat(dist.distance);
                    if(tmpDist < shortestDist) {
                        shortestDist = tmpDist;
                        shortestInd = index;
                    }
                });
                console.log('the shortest one is ' + shortestDist + ' and the index is ' + shortestInd);
                console.log('the nearest station is : ' + stations[shortestInd].keyword + ', suggest to take route number ' + stations[shortestInd].routeId);
                $scope.nearestStation = stations[shortestInd];
            }).then(function () {
                ManageRouteService.findRoutesByStationIds($scope.nearestStation.stationId).then(function (outputRoutes) {
                    $scope.outputRoutes = outputRoutes;
                    console.log('choose route name : ' + $scope.outputRoutes[0].routeName);

                    angular.forEach(outputRoutes, function (route) {
                        var path = [];
                        angular.forEach(route.stations, function (station) {
                            path.push([station.lng, station.lat]);
                        });
                        $scope.map.plugin("AMap.DragRoute", function () {
                            route = new AMap.DragRoute($scope.map, path, AMap.DrivingPolicy.LEAST_DISTANCE);
                            route.search();
                        });
                    });

                    var walking = new AMap.Walking({
                        map: $scope.map
                    });
                    var fromLnglat = new AMap.LngLat($scope.inputBusStation.lng, $scope.inputBusStation.lat);
                    var toLngLat = new AMap.LngLat($scope.nearestStation.lng, $scope.nearestStation.lat);
                    walking.search(fromLnglat, toLngLat);
                });
            });

        });
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

        var circleOpt = {
            map: map,
            center: point.location,
            radius: 1000,
            strokeOpacity: 0.2,
            fillOpacity: 0.2
        };
        $scope.circle = new AMap.Circle(circleOpt);

        marker.on('dragend', function (dragedPoint) {
            $scope.inputBusStation.lng = dragedPoint.lnglat.lng;
            $scope.inputBusStation.lat = dragedPoint.lnglat.lat;
            $scope.circle.setCenter([dragedPoint.lnglat.lng, dragedPoint.lnglat.lat]);
        });

        $scope.inputBusStation.lng = point.location.lng;
        $scope.inputBusStation.lat = point.location.lat;
        $scope.inputBusStation.keyword = point.name;
    };

}]);
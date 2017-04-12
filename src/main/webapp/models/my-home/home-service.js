'use strict';

angular.module('myApp-home').factory('HomeService', ['$http', '$q', 'ManageStationService', 'ManageRouteService', function ($http, $q, ManageStationService, ManageRouteService) {
    return {
        findStationsInCircle: function (circle, tripFlag, apiFlag) {
            var defer = $q.defer();
            var result = [];
            ManageStationService.findAllBusStationsByTripFlag(tripFlag).then(function(stations) {
                angular.forEach(stations.data, function(station){

                    if(apiFlag || circle.contains(new AMap.LngLat(station.lng, station.lat))){
                        result.push(station);
                        console.log('in the circle ' + station.keyword);
                    } else {
                        console.log('out of circle ' + station.keyword);
                    }
                });
                defer.resolve(result);
            });
            return defer.promise;
        }
    };
}]);
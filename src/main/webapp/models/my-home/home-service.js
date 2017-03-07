angular.module('myApp-home').factory('HomeService', ['$http', '$q','ManageStationService', function ($http, $q, ManageStationService) {
    return {
        findStationsInCircle: function (circle) {
            var defer = $q.defer();
            var result = [];
            ManageStationService.findAllBusStations().then(function(stations) {
                angular.forEach(stations.data, function(station){

                    if(circle.contains(new AMap.LngLat(station.lng, station.lat))){
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
    }
}]);
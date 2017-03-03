angular.module('myApp-manageStation').factory('ManageStationService', ['$http', '$resource', function ($http, $resource) {
    var BusStation = $resource('app/rest/busstation/save', {}, {
        save: {method: 'POST', cache: true}
    });
    return {
        findAllBusStations: function () {
            var promise = $http.get('app/rest/busstation/all').then(function (data) {
                return data;
            });
            return promise;
        },
        findAllBusStationByRouteId: function (routeId) {
            return $resource('app/rest/busstation/:routeId', {routeId: routeId}).query().$promise;
        },
        saveBusStation: function (busRoute) {
            var resource = new BusStation();
            resource.keyword = busRoute.keyword;
            resource.city = busRoute.city === '' ? '厦门' : busRoute.city;
            return resource.$save();
        },
        removeStation: function (stationId) {
            return $resource('app/rest/busroute/remove/:stationId', {stationId: stationId}).delete().$promise;
        }
    }
}]);
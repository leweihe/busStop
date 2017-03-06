angular.module('myApp-manageStation').factory('ManageStationService', ['$http', '$resource', function ($http, $resource) {
    var BusStation = $resource('app/rest/busstation/save/:routeId', {routeId: '@routeId'}, {
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
        saveBusStation: function (busStation) {
            var resource = new BusStation();
            resource.keyword = busStation.keyword;
            resource.city = busStation.city === '' ? '厦门' : busStation.city;
            resource.busRouteId = busStation.routeId;
            return resource.$save();
        },
        removeStation: function (routeId, stationId) {
            return $resource('app/rest/busstation/remove/:routeId/:stationId', {routeId: routeId, stationId: stationId}).remove().$promise;
        }
    }
}]);
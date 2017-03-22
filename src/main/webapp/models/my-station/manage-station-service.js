'use strict';

angular.module('myApp-manageStation').factory('ManageStationService', ['$http', '$resource', function ($http, $resource) {
    var BusStation = $resource('app/rest/busstation/save', {}, {
        save: {method: 'POST', cache: true},
        update: {method: 'PUT'}
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
            resource.stationId = busStation.stationId;
            resource.keyword = busStation.keyword;
            resource.city = busStation.city ? '厦门' : busStation.city;
            resource.busRouteId = busStation.routeId;
            resource.lng = busStation.lng;
            resource.lat = busStation.lat;
            resource.description = busStation.description;
            resource.stationPic = busStation.stationPic;
            if (resource.stationId) {
                return resource.$update();
            } else {
                return resource.$save();
            }
        },
        removeStation: function (routeId, stationId) {
            return $resource('app/rest/busstation/remove/:routeId/:stationId', {
                routeId: routeId,
                stationId: stationId
            }).remove().$promise;
        }
    }
}]);

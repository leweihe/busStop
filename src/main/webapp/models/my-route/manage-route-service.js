'use strict';

angular.module('myApp-manageRoute').factory('ManageRouteService', ['$http', '$resource', function ($http, $resource) {
    var BusRoute = $resource('app/rest/busroute/save', {}, {
        save: {method: 'POST', cache: true}
    });
    return {
        findAllBusRoute: function () {
            var promise = $http.get('app/rest/busroute/all').then(function (data) {
                return data;
            });
            return promise;
        },
        findAllBusRouteBuStatus: function (status) {
            var promise = $http.get('app/rest/busroute/all/' + status).then(function (data) {
                return data;
            });
            return promise;
        },
        findRouteById: function (routeId) {
            var promise = $http.get('app/rest/busroute/one/' + routeId).then(function (data) {
                return data;
            });
            return promise;
        },
        saveBusRoute: function (busRoute) {
            var resource = new BusRoute();
            resource.routeId = busRoute.routeId;
            resource.description = busRoute.description;
            resource.routeName = busRoute.routeName;

            resource.sequence = 0; //TODO to implement sequence
            resource.tripFlag = busRoute.tripFlag.name;
            resource.routeStatus = 'ACTIVE'; // TODO busRoute.routeStatus;
            resource.oppRouteId = busRoute.oppRoute ? busRoute.oppRoute.routeId : null;

            return resource.$save();
        },
        removeRoute: function (routeId) {
            return $resource('app/rest/busroute/remove/:routeId', {routeId: routeId}).delete().$promise;
        },
        findRoutesByStationId: function (stationId) {
            return $resource('app/rest/busroute/find/:stationId', {stationId: stationId}).query().$promise;
        },
        findTripFlagValues: function(){
            return $resource('app/rest/tripflag/find', {}).query().$promise;
        }
    }
}]);

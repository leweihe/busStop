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
        saveBusRoute: function (busRoute) {
            var resource = new BusRoute();
            resource.description = busRoute.description;
            resource.routeName = busRoute.routeName;
            return resource.$save();
        },
        removeRoute: function (routeId) {
            return $resource('app/rest/busroute/remove/:routeId', {routeId: routeId}).delete().$promise;
        }
    }
}]);
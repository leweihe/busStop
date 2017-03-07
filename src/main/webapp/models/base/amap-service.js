angular.module('base').service('AmapService', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
    return {
        getAmapWebApiKey: function () {
            return '06268f43b75ea67cbe6faa132acc4d19';
        },

        calcWalkDist: function (origins, destination) {
            var defer = $q.defer();
            var url = 'http://restapi.amap.com/v3/distance?output=json&';

            url += 'origins=';
            angular.forEach(origins, function (origin, index) {
                url += origin.lng;
                url += ',';
                url += origin.lat;
                if (index != origins.length - 1)
                    url += '|';
                else
                    url += '&';
            });

            url += 'destination=' + destination.lng + ',' + destination.lat;

            url += '&key=' + this.getAmapWebApiKey();
            $http.get(url)
                .then(function (returnVal) {
                    if('OK' === returnVal.statusText) {
                        defer.resolve(returnVal.data.results);
                    }
                });
            return defer.promise;
        },

        initTipInput: function (map) {
            //init tip input
            var autoOptions = {
                input: "tipinput",
                city: "厦门",
                citylimit: true
            };

            var auto = new AMap.Autocomplete(autoOptions);

            AMap.event.addListener(auto, "select", function (e) {
                $rootScope.$broadcast('openInfoPoint', e.poi);
                map.setZoom(15);
                map.setCenter(e.poi.location);
            });
        }
    }
}]);
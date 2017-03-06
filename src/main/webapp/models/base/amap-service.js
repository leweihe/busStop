angular.module('base').service('AmapService', ['$rootScope', '$http', function ($rootScope, $http) {
    return {
        getAmapWebApiKey: function () {
            return '06268f43b75ea67cbe6faa132acc4d19';
        },

        calcWalkDist: function (origins, destination) {
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
                .then(function (result) {
                    console.log("" + result.data);
                });
        },

        initTipInput: function (map) {
            //init tip input
            var autoOptions = {
                input: "tipinput"
            };
            var auto = new AMap.Autocomplete(autoOptions);
            var placeSearch = new AMap.PlaceSearch({
                map: map
            });
            AMap.event.addListener(auto, "select", function (e) {
                map.setZoom(15);
                map.setCenter(e.poi.location);
                $rootScope.$broadcast('openInfoPoint', e.poi);
            });
        }
    }
}]);
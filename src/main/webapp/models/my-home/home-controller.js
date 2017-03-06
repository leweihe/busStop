/**
 * Created by cn40580 on 2017-03-06.
 */

angular.module('myApp-home').controller('HomeController', ['$scope', 'HomeService', 'AmapService', function ($scope, HomeService, AmapService) {

    $scope.map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom: 14,
        center: [118.139839, 24.488006]
    });

    $scope.inputKeyword = "连岳里";
    $scope.outputResult;


    $scope.testFunction = function () {
        var originals = [];
        originals.push({lng: 116.481028, lat: 39.989643});
        var destination = {lng: 114.465302, lat: 40.004717};

        AmapService.calcWalkDist(originals, destination);
    };

    $scope.testOpenWind = function () {
        AmapService.openInfoWin($scope.map, {lng: 116.481028, lat:39.989643});
    };

}]);
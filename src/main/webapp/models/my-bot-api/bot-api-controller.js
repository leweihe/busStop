/**
 * Created by cn40580 at 2017-03-06 2:43 PM.
 */
'use strict';

angular.module('myApp-bot-api').controller('BotApiController', ['$scope', 'HomeService', 'AmapService', 'BotApiService', function ($scope, HomeService, AmapService, BotApiService) {
    $scope.sendMsg = function() {
        BotApiService.sendMsg($scope.inputVal);
    }


}]);

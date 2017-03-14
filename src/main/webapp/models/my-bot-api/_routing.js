'use strict';

angular.module('myApp-bot-api').config(function ($stateProvider) {
    $stateProvider.state('bot-api', {
        templateUrl: 'models/my-bot-api/bot-api.html',
        url: '/botApi',
        controller: 'BotApiController'
    });
});

'use strict';

angular.module('myApp-bot-api').config(function ($stateProvider) {
    $stateProvider.state('bot-api', {
        params: {route: null},
        templateUrl: 'models/my-bot-api/bot-api.html',
        url: '/bot-api',
        controller: 'BotApiController'
    }).state('bot-map', {
        params: {lng: null, lat: null, route: null, station: null, showMap: false},
        templateUrl: 'models/my-bot-api/bot-map.html',
        url: '/bot-map',
        controller: 'BotApiController'
    });
});

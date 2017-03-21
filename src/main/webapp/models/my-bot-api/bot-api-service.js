'use strict';

angular.module('myApp-bot-api').factory('BotApiService', ['$http', '$q', 'ManageStationService', 'ManageRouteService', function ($http, $q, ManageStationService, ManageRouteService) {
    return {
        sendMsg: function (inputVal) {

            var url = 'https://directline.botframework.com/v3/directline/conversations';
            var directLineSecret = 'RCurR_XV9ZA.cwA.BKA.iaJrC8xpy8qbOF5xnR2vtCX7CZj0LdjAPGfiCpg4Fv0';
            var directLineClientName = 'DirectLineClient';
            var directLineSpecUrl = 'https://docs.botframework.com/en-us/restapi/directline3/swagger.json';

            var directLineClient = rp(directLineSpecUrl)
                .then(function (spec) {
                    // client
                    return new Swagger({
                        spec: JSON.parse(spec.trim()),
                        usePromise: true
                    });
                })
                .then(function (client) {
                    // add authorization header to client
                    client.clientAuthorizations.add('AuthorizationBotConnector', new Swagger.ApiKeyAuthorization('Authorization', 'Bearer ' + directLineSecret, 'header'));
                    return client;
                })
                .catch(function (err) {
                    console.error('Error initializing DirectLine client', err);
                });
        }
    }
}]);
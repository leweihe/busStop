/**
 * Created by cn40580 at 2016-12-12 9:50 AM.
 */
'use strict';

angular.module('myApp.heart', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'models/home/heart.html',
            controller: 'heartCtrl'
        });
    }])
    .controller('heartCtrl', ['$scope', function ($scope) {


    }]);
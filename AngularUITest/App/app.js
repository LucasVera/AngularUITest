'use strict';

var ngModule = angular.module('AngularUI', [
    'ngResource',
    'ngRoute',
    'ui.calendar'
]);


ngModule.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/calendar', {
            templateUrl: 'views/calendar.html',
            controller: 'CalendarCtrl',
            controllerAs: 'calendar'
        })
        .otherwise({
            redirectTo: '/'
        });
});


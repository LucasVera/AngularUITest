'use strict';

var ngModule = angular.module('AngularUI', [
    'ngResource',
    'ngRoute',
    'ui.calendar',
    'ui.grid'
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
        .when('/grid', {
            templateUrl: 'views/grid.html',
            controller: 'GridCtrl',
            controllerAs: 'grid'
        })
        .otherwise({
            redirectTo: '/'
        });
});


'use strict';

var ngModule = angular.module('AngularUI', [
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'ui.calendar',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.bootstrap',
    'angular-growl'
]);


ngModule.config(function ($routeProvider, growlProvider) {
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

    growlProvider.globalTimeToLive({
        success: 2500,
        error: 8000,
        warning: 2500,
        info: 2500
    });
    growlProvider.globalDisableCountDown(true);

});


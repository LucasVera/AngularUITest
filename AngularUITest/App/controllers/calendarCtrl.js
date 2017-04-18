'use strict';

angular.module('AngularUI')
.controller('CalendarCtrl', ['$scope', '$compile', 'uiCalendarConfig', 'helperService', function ($scope, $compile, uiCalendarConfig, helperService) {

    $scope.initCtrl = function () {
        $scope.algo = 'Algo...';
        $scope.uiConfig = {

            calendar: {
                header: {
                    left: 'agendaDay,agendaWeek,month,list',
                    center: 'title',
                    right: 'today prev,next',
                },

                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],

                eventClick: $scope.eventClick,
                eventRender: $scope.eventRender,

                timeFormat: 'hh:mm a'
                /*
                views: {
                    basic: { timeFormat: 'hh:mm a' },
                    agenda: { timeFormat: 'hh:mm a' },
                    week: { timeFormat: 'hh:mm a' },
                    day: { timeFormat: 'hh:mm a' }
                }
                */
            }
        }

        /*
        $('#calendar').fullCalendar({
    views: {
        basic: {
            // options apply to basicWeek and basicDay views
        },
        agenda: {
            // options apply to agendaWeek and agendaDay views
        },
        week: {
            // options apply to basicWeek and agendaWeek views
        },
        day: {
            // options apply to basicDay and agendaDay views
        }
    }
});
        */

        // ................................. TEST DATA .................................................................................
        var currDate = new Date();
        var d = currDate.getDate();
        var m = currDate.getMonth();
        var y = currDate.getFullYear();
        var h = currDate.getHours();
        $scope.events = [
            { id: 1, title: 'All Day Event', start: new Date(y, m, 1), important: false },
            { id: 2, title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), important:false },
            { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false, important:false },
            { id: 33, title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, important:false }
        ];
        $scope.importantEvents = [
            { id: 11, title: 'Evento importante', start: new Date(y, m, d, h - 5), end: new Date(y, m, d, h + 3), important: true }
        ];
        $scope.eventSources = [{
            events: $scope.events
        }, {
            events: $scope.importantEvents,
            color: 'red',
            textColor: 'yellow'
        }];
        // ...............................................................................................................................

    }

    $scope.addEvent = function (newEvent) {
        var startDateTime = helperService.combineDateAndTime(newEvent.startDate, newEvent.startTime);
        var endDateTime = helperService.combineDateAndTime(newEvent.endDate, newEvent.endTime);
        var event = {
            title: newEvent.title,
            start: startDateTime,
            end: endDateTime,
            id: 464,
            stick: true
        };

        if (newEvent.important) {
            $scope.importantEvents.push(event);
        }
        else {
            $scope.events.push(event);
        }

        /*
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('refetchEvents');
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('rerenderEvents');
        */
    }

    $scope.eventRender = function (event, element, view) {
        element.attr({
            'tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };

    $scope.refreshCalendar = function () {
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('render');
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('refetchEventSources', $scope.eventSources);
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('refetchEvents');
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('rerenderEvents');
    }

    $scope.eventClick = function (event, jsEvent, view) {
        
        console.log(event);

        $scope.modEvent = {
            startDateTime: event.start._d,
            endDateTime: event.end._d,
            startDate: event.start._d,
            startTime: event.start._d,
            endDate: event.end._d,
            endTime: event.end._d,
            title: event.title,
            id: event.id,
            important: event.important
        };
        console.log(JSON.stringify($scope.modEvent));
        $('#modifyEventModal').modal('show');
    }

    $scope.modifyEvent = function (modEvent) {
        console.log('Modified event: ' + modEvent);
    }

    $scope.removeEvent = function (modEvent) {

        

        console.log('Removed event: ' + modEvent)
    }

    $scope.initCtrl();

    $scope.btnTest = function () {
        var currDate = new Date();
        var d = currDate.getDate();
        var m = currDate.getMonth();
        var y = currDate.getFullYear();
        var h = currDate.getHours();

        var event = {
            id: 333,
            title: 'TEST EVENT',
            start: new Date(y, m, d, h - 2),
            end: new Date(y, m, d, h + 2)
        };

        $scope.events.push(event);
    }
}]);


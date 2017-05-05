'use strict';

angular.module('AngularUI')
.controller('CalendarCtrl', ['$scope', '$compile', '$uibModal', '$timeout', 'uiCalendarConfig', 'helperService', function ($scope, $compile, $uibModal, $timeout, uiCalendarConfig, helperService) {

    $scope.initCtrl = function () {
        $scope.algo = 'Algo...';
        $scope.uiConfig = {

            calendar: {
                header: {
                    left: 'basicDay,agendaWeek,month,listMonth',
                    center: 'title',
                    right: 'today prev,next',
                },

                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],

                eventClick: $scope.eventClick,
                eventRender: $scope.eventRender,

                businessHours: {
                    dow: [1, 2, 3, 4, 5],
                    start: '07:00',
                    end: '17:00'
                },

                eventLimit: true,
                views: {
                    basic: {
                        timeFormat: 'hh:mm a'
                    },
                    agenda: {
                        timeFormat: 'hh:mm a'
                    },
                    month: {
                        timeFormat: 'h(:mm)a'
                    }
                },

                //theme:true, <--- use custom jquery css

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

        // ................................. TEST DATA .........................................................................
        var currDate = new Date();
        var d = currDate.getDate();
        var m = currDate.getMonth();
        var y = currDate.getFullYear();
        var h = currDate.getHours();
        $scope.events = [
            { id: 1, title: 'All Day Event', start: new Date(y, m, 1), important: false },
            { id: 2, title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), important: false },
            { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false, important: false },
            { id: 33, title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, important: false }
        ];
        $scope.importantEvents = [
            { id: 11, title: 'Evento importante', start: new Date(y, m, d, h - 5), end: new Date(y, m, d, h + 3), important: true }
        ];
        $scope.eventSources = [{
            events: $scope.events
        }, {
            events: $scope.importantEvents,
            //textColor: 'yellow',
            color: 'red',
            borderColor: 'green'
        }];
        // ......................................................................................................................

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

        $scope.closeModal('addEvent');

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
    }

    $scope.refreshCalendar = function () {
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('render');
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('refetchEventSources', $scope.eventSources);
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('refetchEvents');
        uiCalendarConfig.calendars['testCalendar'].fullCalendar('rerenderEvents');
    }

    $scope.eventClick = function (event, jsEvent, view) {

        console.log(event);
        console.log('\njsEvent: ');
        console.log(jsEvent);
        console.log('\nview:');
        console.log(view);

        $scope.modEvent = {
            startDateTime: event.start._d,
            endDateTime: event.end._d,
            startDate: event.start._d,
            startTime: event.start._d,
            endDate: event.end._d,
            endTime: event.end._d,
            title: event.title,
            id: event.id,
            important: event.important,
            index: event._id - 1,
        };
        console.log(JSON.stringify($scope.modEvent));
        $scope.openModifyEventModal(angular.copy($scope.modEvent));
        //$('#modifyEventModal').modal('show');
    }

    $scope.modifyEvent = function (modEvent) {
        console.log('origEvent: ' + JSON.stringify($scope.modifyEventModal.origEvent));
        console.log('Modified event: ' + JSON.stringify(modEvent));
        console.log('index: ' + $scope.modifyEventModal.origEvent.index);
        var event = $scope.modifyEventModal.origEvent;
        if (event.important) {
            var origEvent = $scope.importantEvents[event.index];
        }
        else {
            var origEvent = $scope.events[event.index];
        }
        console.log('origEvent: ');
        console.log(origEvent);

        if (origEvent != undefined && origEvent != null) {
            origEvent.start = modEvent.startDateTime;
            origEvent.end = modEvent.endDateTime;
            origEvent.title = modEvent.title;
            if (origEvent.important != modEvent.important) {
                if (origEvent.important) {
                    $scope.importantEvents.splice(event.index, 1);
                    $scope.events.push(origEvent);
                }
                else {
                    $scope.events.splice(event.index, 1);
                    $scope.importantEvents.push(origEvent);
                }
            }
        }

        $scope.closeModal('modifyEvent');
    }

    $scope.removeEvent = function (modEvent) {
        $scope.modifyEventModal.showAlert = true;
        $scope.modifyEventModal.alertClass = 'alert-info';
        $scope.modifyEventModal.alertMsg = 'Eliminando este evento...';
        $timeout(function () {
            $scope.modifyEventModal.showAlert = true;
            $scope.modifyEventModal.alertClass = 'alert-success';
            $scope.modifyEventModal.alertMsg = 'Evento eliminado con éxito';
            console.log('Removed event: ' + modEvent);
            $timeout(function () {
                $scope.modifyEventModal.showAlert = false;
                $scope.closeModal('modifyEvent');
            }, 500);
        }, 1500);
    }

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

        $scope.events[0].title = 'title updated';
    }

    // ..................... MODALS SETUP AND METHODS .........................
    $scope.openAddEventModal = function () {
        $scope.addEventModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/addEventModal.html',
            controller: 'CalendarCtrl',
            controllerAs: 'calendar',
            bindToController: true,
            scope: $scope
        });
    }

    $scope.openModifyEventModal = function (event) {
        $scope.startDateOptions = {
            initDate: new Date(),
            clearText: 'Limpiar',
            'clear-text': 'Limpiar',
            'close-text': 'Cerrar',
            'current-text': 'Hoy'
        };
        console.log($scope.startDateOptions);
        $scope.modEvent.startDatePicker = {
            opened: false
        };
        $scope.modifyEventModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/modifyEventModal.html',
            controller: 'CalendarCtrl',
            controllerAs: 'calendar',
            bindToController: true,
            scope: $scope,

            // custom properties...
            showAlert: false,
            alertMsg: '',
            alertClass: ''
        });
        $scope.modifyEventModal.origEvent = event;
        console.log($scope.modifyEventModal);
    }

    $scope.closeModal = function (modalName) {
        switch (modalName) {
            case 'addEvent':
                if ($scope.addEventModal != undefined && $scope.addEventModal != null) {
                    $scope.addEventModal.close();
                    $scope.addEventModal = null;
                }
                break;

            case 'modifyEvent':
                if ($scope.modifyEventModal != undefined && $scope.modifyEventModal != null) {
                    $scope.modifyEventModal.close();
                    $scope.modifyEventModal = null;
                }
                break;
        }
    }

    // ........................................................................

    $scope.initCtrl();
}]);


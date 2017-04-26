'use strict';

angular.module('AngularUI')
    .service('helperService', ['$timeout', function ($timeout) {

        this.combineDateAndTime = function (date, time) {
            if (date && time) {
                var dd = new Date(date).getDate();
                var mm = new Date(date).getMonth();
                var yy = new Date(date).getFullYear();
                var hh = new Date(time).getHours();
                var ms = new Date(time).getMinutes();

                return new Date(yy, mm, dd, hh, ms);
            }

            return null;
        }

        this.splitDateAndTime = function (dateTime) {
            if (dateTime) {
                var dd = new Date(dateTime).getDate();
                var mm = new Date(dateTime).getMonth();
                var yy = new Date(dateTime).getFullYear();
                var hh = new Date(dateTime).getHours();
                var ms = new Date(dateTime).getMinutes();

                var date = new Date(yy, mm, dd);
                var time = new Date(yy, mm, dd, hh, ms);
                return {
                    date: date,
                    time: time
                };
            }

            return null;
        }

        this.getObjectInArrayById = function (array, id) {
            for (var i = 0; i < array.length; i++) {
                console.log('buscando en ' + JSON.stringify(array[i]));
                if (array[i].id == id) {
                    return array[i];
                }
            }
            return null;
        }

        this.getIndexOfIdInArray = function (array, id) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == id) {
                    return i;
                }
            }
            return null;
        }

    }])
;

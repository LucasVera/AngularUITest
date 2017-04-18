'use strict';

angular.module('AngularUI')
.controller('GridCtrl', ['$scope', '$window', '$timeout', function ($scope, $window, $timeout) {

    $scope.initController = function () {
        $scope.users = [
        {
            names: 'Juan',
            lastNames: 'Torres',
            company: 'Navitrans',
            isAdmin: false,
            age: 34
        },
        {
            names: 'Lucas',
            lastNames: 'Vera Toro',
            company: 'Blisoft',
            isAdmin: true,
            age: 27
        },
        {
            names: 'Rey',
            lastNames: '',
            company: '',
            age:4
        }
        ];

        $scope.gridOpts = {
            columnDefs: [
                { name: 'Nombres', field: 'names', enableHiding: false },
                { name: 'Apellidos', field: 'lastNames' },
                { name: 'Compañía', field: 'company' },
                { name: 'Admin', field: 'isAdmin' },
                { name: 'Edad', field: 'age' },
            ],
            data: $scope.users,
            enableGridMenu: true,
            gridMenuCustomItems: [
                {
                    title: 'Acción: refrescar datos',
                    action: function () {
                        $window.alert('Datos renovados');
                    }
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;

                $timeout(function () {
                    gridApi.core
                })
            }
        };


    }


    $scope.doAction1 = function () {
        $window.alert('Acción 1 realizada!!');
    }

    $scope.addRecord = function (newRecord) {
        console.log('Record: ' + JSON.stringify(newRecord));
        $scope.users.push(angular.copy(newRecord));
        $scope.newRecord = {};
        $('#addRecordModal').modal('hide');
    }

    $scope.initController();
}]);
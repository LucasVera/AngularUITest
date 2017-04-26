'use strict';

angular.module('AngularUI')
.controller('GridCtrl', ['$scope', '$window', '$timeout', '$q', 'growl', function ($scope, $window, $timeout, $q, growl) {

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
            enableFiltering: true,
            columnDefs: [
                { name: 'Nombres', field: 'names', enableHiding: false },
                { name: 'Apellidos', field: 'lastNames' },
                { name: 'Compañía', field: 'company' },
                { name: 'Admin', field: 'isAdmin', enableCellEdit:false, type:'boolean', enableFiltering:false },
                { name: 'Edad', field: 'age', type: 'number', enableFiltering:false },
            ],
            data: $scope.users,
            enableGridMenu: true,
            gridMenuCustomItems: [
                {
                    title: 'Acción: refrescar datos',
                    action: function () {
                        //$window.alert('Datos renovados');
                        growl.info('Datos renovados');
                    }
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $timeout(function () {
                    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
                });
            }
        };


    }

    $scope.saveRow = function (rowEntity) {
        // call $resource and wait for the promise to resolve (callback). using fake promise for now
        var promise = $q.defer();
        $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);

        // fake a delay of 3 seconds. if Compañia is not blisoft, return error
        $timeout(function () {
            if (rowEntity.company.toLowerCase() !== 'blisoft') {
                promise.reject();
                growl.error(rowEntity.names + ' Debe tener como compañia Blisoft.');
            }
            else {
                promise.resolve();
                growl.success('Se han guardado los cambios');
            }
        }, 3000);
    }

    $scope.doAction1 = function () {
        //$window.alert('Acción 1 realizada!!');
        growl.info('Scción 1 realizada')
    }

    $scope.addRecord = function (newRecord) {
        console.log('Record: ' + JSON.stringify(newRecord));
        $scope.users.push(angular.copy(newRecord));
        $scope.newRecord = {};
        $('#addRecordModal').modal('hide');
    }

    $scope.initController();
}]);
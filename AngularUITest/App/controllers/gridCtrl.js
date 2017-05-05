'use strict';

angular.module('AngularUI')
.controller('GridCtrl', ['$scope', '$window', '$timeout', '$q', 'growl', function ($scope, $window, $timeout, $q, growl) {

    $scope.initController = function () {
        $scope.users = [
        {
            names: 'Juan',
            lastNames: 'Torres',
            company: 1,
            isAdmin: false,
            age: 34
        },
        {
            names: 'Lucas',
            lastNames: 'Vera Toro',
            company: 2,
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
            enableColumnResizing: true,

            columnDefs: [
                { name: 'Nombres', field: 'names', enableHiding: false, minWidth:150 },
                { name: 'Apellidos', field: 'lastNames', minWidth:150 },
                {
                    name: 'Compañía', field: 'company', minWidth: 120, editableCellTemplate: 'ui-grid/dropdownEditor', cellFilter: 'mapCompany', editDropdownValueLabel: 'company', editDropdownOptionsArray: [
                        { id: 1, company: 'Navitrans' },
                        { id: 2, company: 'Blisoft' }
                    ]
                },
                { name: 'Admin', field: 'isAdmin', enableCellEdit:false, type:'boolean', enableFiltering:false, minWidth:80 },
                { name: 'Edad', field: 'age', type: 'number', enableFiltering:false, minWidth:80 },
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
        growl.info('Scción 1 realizada');
    }

    $scope.addRecord = function (newRecord) {
        console.log('Record: ' + JSON.stringify(newRecord));
        $scope.users.push(angular.copy(newRecord));
        $scope.newRecord = {};
        $('#addRecordModal').modal('hide');
    }

    $scope.initController();
}])
.filter('mapCompany', function () {
    var companyHash = {
        1: 'Navitrans',
        2: 'Blisoft'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return companyHash[input];
        }
    };
})
;
'use strict';

var companyHash = {
    1: 'Navitrans',
    2: 'Blisoft'
};

var companyArray = [
    0,
    'Navitrans',
    'Blisoft'
];

angular.module('AngularUI')
.controller('GridCtrl', ['$scope', '$window', '$timeout', '$q', '$uibModal', '$location', 'growl', function ($scope, $window, $timeout, $q, $uibModal, $location, growl) {

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
                { name: 'Admin', field: 'isAdmin', enableCellEdit:false, type:'boolean', enableFiltering:false, minWidth:80, allowCellFocus:false },
                { name: 'Edad', field: 'age', type: 'number', enableFiltering: false, minWidth: 80 },
                {
                    name: 'Opciones', field: 'options', enableSorting:false, allowCellFocus:false, scope:$scope,
                    cellTemplate: 'views/cellTemplates/gridOptionCellTemplate.html',
                    enableCellEdit: false, enableFiltering: false, enableHiding: false, enableColumnResizing: false
                }
            ],
            data: $scope.users,
            enableGridMenu: true,
            gridMenuCustomItems: [
                {
                    title: 'Acción: refrescar datos',
                    action: function () {
                        //$window.alert('Datos renovados');
                        growl.info('Cargando... ', {ttl:2100, onlyUniqueMessages: false});
                        $timeout(function () { growl.success('Datos renovados'); }, 2000);
                    }
                }
            ],

            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $timeout(function () {
                    // register grid callbacks
                    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
                    gridApi.cellNav.on.navigate($scope, $scope.cellNavigated);
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
            if (companyArray[rowEntity.company].toLowerCase() !== 'blisoft') {
                promise.reject();
                growl.error(rowEntity.names + ' Debe tener como compañia Blisoft.');
            }
            else {
                promise.resolve();
                growl.success('Se han guardado los cambios');
            }
        }, 3000);
    }

    $scope.cellNavigated = function (newRowCol, oldRowCol) {
        if (newRowCol.col.field == 'options') {
            $scope.selectedRow = newRowCol.row.entity;
            $scope.dropdownIsOpen = true;
            console.log($scope.gridOpts.appScope);
        }
    }

    $scope.rowOption = function (optionClicked, row) {
        switch (optionClicked) {
            case 1: //change age to 99
                row.age = 99;
                break;

            case 2: // mostrar nombre y apellidos en info
                growl.warning(row.names + ' ' + row.lastNames);
                break;

            case 3: // ir a calendario
                $location.path('/calendar');
                break;

            default:
                console.log('Opción erronea...');
                break;
        }
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

    return function (input) {
        if (!input) {
            return '';
        } else {
            return companyHash[input];
        }
    };
})
;
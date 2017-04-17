'use strict';

angular.module('AngularUI')
.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.initCtrl = function () {
        $scope.algo = 'Algo...';
    }

    $scope.initCtrl();

}]);

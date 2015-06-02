'use strict';

// Parent controller
angular.module('projectBoard')
  .controller('DashboardCtrl', ['$scope', function ($scope) {
    $scope.gridsterOpts = {
      resizable: {
        enabled: false
      },
      draggable: {
        enabled: false
      }
    };
  }]);

'use strict';

angular.module('projectBoard')
  .controller('HomeCtrl', ['$scope', 'projectService', function ($scope, projectService) {
    projectService.getProjects().then(function(data) {

      $scope.projects = data;
    });
  }]);

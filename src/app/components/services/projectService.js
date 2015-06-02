'use strict';

angular.module('projectBoard')
  .service('projectService', ['$stateParams', 'config', '$q', '$http', 'projects', function ($stateParams, config, $q, $http, projects) {
    return {
      getCurrentProject: function () {
        return this.getProject($stateParams.projectSlug);
      },
      getCurrentProjectConfig: function () {
        var projectConfig = projects[$stateParams.projectSlug].widgets;
        if (projectConfig === undefined || projectConfig === null) {
          throw 'No configuration found for the project: ' + $stateParams.projectSlug;
        }
        return projectConfig;
      },
      getProjects: function() {
        return $q(function(resolve, reject) {
          if (projects) {
            resolve(projects);
          } else {
            reject('No projects found');
          }
        });
      },
      getProject: function(projectSlug) {
        return $q(function(resolve, reject) {
          if (projects.hasOwnProperty(projectSlug)) {
            resolve(projects[projectSlug]);
          } else {
            reject('Project ' + projectSlug + ' not found');
          }
        });
      },
    };
  }]);

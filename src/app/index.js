'use strict';

angular.module('projectBoard', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'gridster', 'projectBoard.config', 'slick', 'projectBoard.widgets', 'projectBoard.dataProviders', 'angularMoment', 'ngFx'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('dashboard', {
        url: '/dashboard/:projectSlug',
        abstract: true,
        controller: 'DashboardCtrl',
        resolve: {
          project:  function(projectService, $stateParams, $state) {
            return projectService.getProject($stateParams.projectSlug)
              .then(function(data) {
                return data;
              }, function() {
                return $state.go('error');
              })
            ;
          },
        },
        templateUrl: 'app/components/dashboard/dashboard.html',
      })
      .state('dashboard.view', {
        url: '/view',
        templateProvider: function($http, $stateParams) {
          var projectSlug  = $stateParams.projectSlug;
          var templateName = 'app/projects/' + projectSlug + '/' + projectSlug + '.html';
          return $http
            .get(templateName)
            .then(function(tpl){
              return tpl.data;
            }, function () {
              // template not found
              return $http
                .get('app/components/dashboard/dashboard.view.html')
                .then(function(tpl){
                  return tpl.data;
                });
            })
          ;
        },
        controllerProvider: function($stateParams, HelperService) {
          var controllerName = HelperService.controllerNameByProject($stateParams.projectSlug);
          return controllerName;
        },
      })
      .state('error', {
        url: 'error',
        resolve: {
          errorObj: function() {
            return this.self.error;
          }
        },
        templateUrl: '/app/components/error/error.html',
    });

    $urlRouterProvider.otherwise('/');

  }])
  .run(function($rootScope, timingFactory) {
    $rootScope.$on('$stateChangeSuccess', function() {
      timingFactory.unregisterAll();
    });
  })
;

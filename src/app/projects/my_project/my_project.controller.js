'use strict';

angular.module('projectBoard')
  .controller('MyProjectCtrl', ['$scope', 'project', function ($scope, project) {
    $scope.widget1 = {
      title: 'Sous',
      provider: {},
      options: {
        subtitle: '€/30sec',
        icon: 'fa-euro',
      },
      timingOptions: {
        interval: 30000,
        delay: 5000,
      }
    };
    $scope.widget2 = {
      title: 'Analytics',
      provider: {},
      options: {
        subtitle: 'Visiteurs live',
        icon: 'fa-line-chart',
      },
      timingOptions: {
        interval: 3000,
        delay: 0,
      }
    };
    $scope.widget3 = {
      title: 'Tweets',
      class: 'widget-simpleNumber-twitter',
      provider: {
        name: 'socialCount',
        method: 'twitterCountPromise',
        property: 'twitter_count',
      },
      options: {
        subtitle: 'tweets',
        icon: 'fa-twitter',
      },
      timingOptions: {
        interval: 10000,
      }
    };
    $scope.planningWidget = {
      options: {
        items: project.widgets.planning.items
      }
    };
    $scope.widgetProject = {
      options: {
        project: project
      }
    };
  }])
;

'use strict';

// Fork from https://github.com/sparkalow/angular-count-to
angular.module('projectBoard')
  .directive('countTo', ['$timeout', function ($timeout) {
    return {
      replace: false,
      scope: true,
      link: function (scope, element, attrs) {
        var e = element[0];
        var num, refreshInterval, duration, steps, step, countTo, increment;
        scope.value = 0;
        var calculate = function () {
          step = 0;
          refreshInterval = 30;
          scope.timoutId = null;
          countTo = parseInt(attrs.countTo) || 0;
          duration = (parseFloat(attrs.duration) * 1000) || 1000;
          steps = Math.ceil(duration / refreshInterval);
          increment = ((countTo - scope.value) / steps);
          num = scope.value;
        };

        var tick = function () {
          scope.timoutId = $timeout(function () {
            num += increment;
            step++;
            if (step >= steps) {
              $timeout.cancel(scope.timoutId);
              num = countTo;
              e.textContent = countTo;
              scope.value = countTo;
            } else {
              e.textContent = Math.round(num);
              tick();
            }
          }, refreshInterval);
        };

        var start = function () {
          if (scope.timoutId) {
            $timeout.cancel(scope.timoutId);
          }
          calculate();
          tick();
        };

        attrs.$observe('countTo', function (val) {
          if (val) {
            start();
          }
        });

        return true;
      }
    };
  }]);
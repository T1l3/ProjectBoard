'use strict';

angular.module('projectBoard.widgets')
.directive('planningWidget', ['widgetFactory', 'timingFactory', '$timeout', function(widgetFactory, timingFactory, $timeout) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: function($element, $attrs) {
      return widgetFactory.getTemplate($attrs, 'app/widgets/planningWidget/planningWidget.html');
    },
    link: function($scope, $element, $attrs) {
      var defaultOptions = {
        title: 'Planning',
        options: {},
        timingOptions: {
          interval: 9999999,
          delay: 0,
        }
      };
      var widget = widgetFactory.getWidgetConfig(defaultOptions, $scope.$eval($attrs.planningWidget));

      var init, tickHandler;
      $scope.loaded = false;
      init = function() {
        $scope.title = widget.title;
        $scope.items = [];
        var i = 0;
         angular.forEach(widget.options.items, function(item) {
            $timeout(function() {
              $scope.items.push(item);
            }, 300 * i++);
        });

        timingFactory.register(tickHandler, widget.timingOptions);
      };

      tickHandler = function() {
        // $scope.items = widget.options.items;
        if ($scope.loaded === false) {
          $scope.loaded = true;
        }
      };

      init();
    }
  };
}]);

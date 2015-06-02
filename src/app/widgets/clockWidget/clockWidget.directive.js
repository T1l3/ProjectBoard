'use strict';

angular.module('projectBoard.widgets')
.directive('clockWidget', ['widgetFactory', 'timingFactory', function(widgetFactory, timingFactory) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: function($element, $attrs) {
      return widgetFactory.getTemplate($attrs, 'app/widgets/clockWidget/clockWidget.html');
    },
    link: function($scope, $element, $attrs) {
      var defaultOptions = {
        timingOptions: {
          interval: 1000,
        }
      };
      var widget = widgetFactory.getWidgetConfig(defaultOptions, $scope.$eval($attrs.imageWidget));

      var init, tickHandler;
      init = function() {
        $scope.title = widget.title;
        $scope.date  = new Date();

        timingFactory.register(tickHandler, widget.timingOptions);
      };

      tickHandler = function() {
        $scope.date = new Date();
      };

      init();
    }
  };
}]);


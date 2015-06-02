'use strict';

angular.module('projectBoard.widgets')
.directive('socialWidget', ['widgetFactory', 'timingFactory', function(widgetFactory, timingFactory) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: function($element, $attrs) {
      return widgetFactory.getTemplate($attrs, 'app/widgets/socialWidget/socialWidget.html');
    },
    link: function($scope, $element, $attrs) {
      var defaultOptions = {
        title: '',
        provider: {
          name: 'socialCount',
          method: 'getAllCount',
        },
        timingOptions: {
          interval: 60000,
        }
      };
      var widget = widgetFactory.getWidgetConfig(defaultOptions, $scope.$eval($attrs.socialWidget));

      var init, tickHandler, provider;
      init = function() {
        $scope.title = widget.title;

        provider = widgetFactory.getDataProvider(widget.provider.name + 'Provider');

        timingFactory.register(tickHandler, widget.timingOptions);
      };

      tickHandler = function() {
        $scope.number = provider[widget.provider.method]()
          .then(function(data) {
            $scope.count = data;
          })
        ;
      };

      init();
    }
  };
}]);

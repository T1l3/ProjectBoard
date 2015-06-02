'use strict';

angular.module('projectBoard.widgets')
.directive('simpleNumberWidget', ['widgetFactory', 'timingFactory', function(widgetFactory, timingFactory) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: function($element, $attrs) {
      return widgetFactory.getTemplate($attrs, 'app/widgets/simpleNumberWidget/simpleNumberWidget.html');
    },
    link: function($scope, $element, $attrs) {
      var defaultOptions = {
        title: '',
        provider: {
          name: 'number',
          method: 'getRandomNumber',
          property: 'number',
        },
        options: {
          number: 0,
          isNumberUp: true,
          subtitle: '',
          icon: 'fa-line-chart',
        },
        timingOptions: {
          delay: 5000,
        }
      };
      var widget = widgetFactory.getWidgetConfig(defaultOptions, $scope.$eval($attrs.simpleNumberWidget));

      var init, tickHandler, provider, previousNumber = 0;
      $scope.loaded = false;
      $scope.onRefresh = false;
      init = function() {
        $scope.title      = widget.title;
        $scope.class      = widget.class;
        $scope.number     = widget.options.number;
        $scope.isNumberUp = widget.options.isNumberUp;
        $scope.subtitle   = widget.options.subtitle;
        $scope.icon       = widget.options.icon;
        provider = widgetFactory.getDataProvider(widget.provider.name + 'Provider');

        timingFactory.register(tickHandler, widget.timingOptions);
      };

      tickHandler = function() {
        if ($scope.loaded) {
          $scope.onRefresh = true;
        }
        provider[widget.provider.method]()
          .then(function(data) {
            $scope.onRefresh = false;
            previousNumber = $scope.number;
            $scope.number  = data[widget.provider.property];
            $scope.lastUpdate = widgetFactory.getLastUpdate();
            $scope.isNumberUp = (previousNumber <= $scope.number) ? true : false;
            if ($scope.loaded === false) {
              $scope.loaded = true;
            }
          })
        ;
      };

      init();
    }
  };
}]);

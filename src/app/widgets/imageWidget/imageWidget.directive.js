'use strict';

angular.module('projectBoard.widgets')
  .directive('imageWidget', ['widgetFactory', 'timingFactory', function(widgetFactory, timingFactory) {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: function($element, $attrs) {
        return widgetFactory.getTemplate($attrs, 'app/widgets/imageWidget/imageWidget.html');
      },
      link: function($scope, $element, $attrs) {
        var defaultOptions = {
          provider: {
            name: 'instagram',
            method: 'fetchPopular',
          },
          options: {
            tag: 'sea',
          },
          timingOptions: {
            interval: 60000,
          }
        };
        var widget = widgetFactory.getWidgetConfig(defaultOptions, $scope.$eval($attrs.imageWidget));

        var init, tickHandler, provider;
        init = function() {
          $scope.title = widget.options.tag;

          provider = widgetFactory.getDataProvider(widget.provider.name + 'Provider');

          timingFactory.register(tickHandler, widget.timingOptions);
        };

        tickHandler = function() {
          $scope.number = provider[widget.provider.method](widget.options.tag)
            .then(function(data) {
              $scope.image = data;
              $scope.lastUpdate = widgetFactory.getLastUpdate();
            })
          ;
        };

        init();
      },
    };
  }]);

## Create a widget

A widget is used in a board. It is basically a directive and a template with some ticking function to pull the data at regular intervals.

This is how you show a widget in your board:

    <li gridster-item size-x="2" size-y="1" clock-widget="{{ myWidgetConfig }}"></li>

You call the clockWidget directive and pass it some options.

All widgets are on the `src/app/widgets/` directory. You need to create a specific folder to each widget.


### Structure
    - widgets
        -your_widget
            - assets/
            - your_widget.directive.js
            - your_widget.html

### Simple directive

All your widgets SHOULD inject the widgetFactory and the timingFactory. It contain some
Your widget name SHOULD be of the type `clockWidget` (nameInCamelCase + "Widget")

    'use strict';

    angular.module('projectBoard.widgets')
    .directive('clockWidget', ['widgetFactory', 'timingFactory', function(widgetFactory, timingFactory) {
      return {
        restrict: 'A',
        scope: true,
        templateUrl: function($element, $attrs) {
          // This function enable the user to overide your template with
          // template-url="path/to/my_custom_template.html"
          return widgetFactory.getTemplate($attrs, 'app/widgets/clockWidget/clockWidget.html');
        },
        link: function($scope, $element, $attrs) {
          // Define all your default widget configuration
          var defaultOptions = {
            timingOptions: {
              interval: 1000,
            }
          };
          // This function merges all users config with the default widget config
          // Don't forget to change $attrs.clockWidget
          var widget = widgetFactory.getWidgetConfig(defaultOptions, $scope.$eval($attrs.clockWidget));

          var init, tickHandler;
          init = function() {
            $scope.title = widget.title;
            $scope.date  = new Date();

            // We register a tickHandler to refresh the data
            timingFactory.register(tickHandler, widget.timingOptions);
          };

          // This function is called every 1000 ms (timingOptions.interval)
          tickHandler = function() {
            $scope.date = new Date();
          };

          init();
        }
      };
    }]);


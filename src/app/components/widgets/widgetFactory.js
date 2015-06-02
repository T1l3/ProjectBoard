'use strict';

// http://stackoverflow.com/questions/18887626/inheriting-angularjs-directives-to-create-reusable-components
angular.module('projectBoard.widgets')
  .factory('widgetFactory', ['$injector', function ($injector) {
    this.getDataProvider = function (dataProviderName) {
      var dataProvider = $injector.get(dataProviderName);

      return dataProvider;
    };
    this.timingOptions = function () {
      return  {
        id: name + Math.floor(Math.random() * 100000), // @Todo get real unique id
        interval: 3000,
        delay: 2000
      };
      // angular.extend(defaultOptions, options);

      // return defaultOptions;
    };
    this.getLastUpdate = function () {
      return new Date();
    };
    this.getTemplate = function ($attrs, tpl) {
      return $attrs.templateUrl || tpl;
    };
    // http://stackoverflow.com/a/17243064/1235943
    this.merge = function (obj1, obj2) {
      var result = {};
      for (var i in obj1) {
        if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
          result[i] = this.merge(obj1[i], obj2[i]);
        } else {
          result[i] = obj1[i];
        }
      }
      for (i in obj2){
        if (i in result) {
          continue;
        }
        result[i] = obj2[i];
      }
      return result;
    };
    this.getWidgetConfig = function (defaultOptions, userOptions) {
      defaultOptions.timingOptions = angular.extend({}, this.timingOptions(), defaultOptions.timingOptions);
      return this.merge(userOptions, defaultOptions);
    };

    return this;
  }]);

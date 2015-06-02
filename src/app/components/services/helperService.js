'use strict';

angular.module('projectBoard')
  .factory('HelperService', [function() {
    return {
      camelCase: function(name) {
        var regex = /([\:\-\_\ \.]+(.))/g;
        return name.
          replace(regex, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
          }).replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          })
        ;
      },
      controllerNameByProject: function(projectSlug) {
        var controller = this.camelCase(projectSlug) + 'Ctrl';

        return controller;
      }
    };
  }]);

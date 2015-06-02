'use strict';

angular.module('projectBoard.dataProviders')
  .service('numberProvider', ['$q', '$timeout', function ($q, $timeout) {
    return {
      getRandomNumber: function () {
        var deferred = $q.defer();
        var randomNumber = {
          number: Math.floor(Math.random() * 10000)
        };
        // Fake delay
        $timeout(function() {
          deferred.resolve(randomNumber);
        }, 1500);

        return deferred.promise;
      }
    };
  }]);

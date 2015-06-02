'use strict';

// https://ajsblackbelt.wordpress.com/2014/05/13/timing-service/comment-page-1/
angular.module('projectBoard.dataProviders')
  .factory('timingFactory', ['$interval', function ($interval) {
    var registrants = {},
      internalInterval = 1000;

    var start = function () {
      $interval(service.tick, internalInterval);
      service.tick();
    };

    var service = {
      register: function (tickHandler, options) {
        registrants[options.id] = {
          tick: tickHandler,
          interval: options.interval,
          delay: options.delay
        };
      },
      unregister: function (id) {
        delete registrants[id];
      },
      unregisterAll: function () {
        registrants = {};
      },
      tick: function (lastUpdate) {
        angular.forEach(registrants, function (registrant) {
          // update the delay.
          registrant.delay -= internalInterval;

          if (registrant.delay <= 0) {
            // time to tick!
            registrant.tick();
            lastUpdate = new Date().toLocaleString();

            //reset delay to configured interval
            registrant.delay = registrant.interval;
          }
        });
      }
    };

    start();

    return service;
  }]);
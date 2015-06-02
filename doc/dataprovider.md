## Create a dataProvider

A dataProvider is a service which provide a promise with data.

All dataProviders are on the `src/app/dataProviders/` directory. You need to create a specific folder to each dataProvider.

### Structure
    - dataProviders
        - yourProvider
            - yourProvider.js

### Simple Provider

A dataProvider must be of the type yourProvider (name + "Provider")

    'use strict';

    angular.module('projectBoard.dataProviders')
      .service('instagramProvider', ['$http', 'projectService', function ($http, projectService) {
        return {
          fetchPopular: function (tag) {
            // Get project configuration
            var apiKey = projectService.getCurrentProjectConfig().instagram.apiKey;
            var endPoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=' + apiKey + '&callback=JSON_CALLBACK&count=1';
            // Return a promise
            return $http.jsonp(endPoint).then(function(data){
              return data.data.data[0].images.low_resolution.url;
            });
          }
        };
      }]);



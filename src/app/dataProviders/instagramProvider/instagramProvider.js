'use strict';

angular.module('projectBoard.dataProviders')
  .service('instagramProvider', ['$http', 'projectService', function ($http, projectService) {
    return {
      fetchPopular: function (tag) {
        var apiKey = projectService.getCurrentProjectConfig().instagram.apiKey;
        var endPoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=' + apiKey + '&callback=JSON_CALLBACK&count=1';

        return $http.jsonp(endPoint).then(function(data){
          /* jshint camelcase: false */
          return data.data.data[0].images.low_resolution.url;
        });
      }
    };
  }]);

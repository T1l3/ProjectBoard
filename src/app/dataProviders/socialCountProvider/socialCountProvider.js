'use strict';

angular.module('projectBoard.dataProviders')
  .service('socialCountProvider', ['$http', 'projectService', '$q', function ($http, projectService, $q) {
    var url = encodeURIComponent(projectService.getCurrentProjectConfig().url);
    return {
      facebookCountPromise: function (type) {
        var endPoint = 'http://graph.facebook.com/fql?q=SELECT+' + type + '+FROM+link_stat+WHERE+url="'+ url + '"&callback=JSON_CALLBACK';
        return $http.jsonp(endPoint).then(function(data) {
          var result = {};
          if (data.data.error) {
            result['facebook_' + type] = -1;
          } else if (0 === data.data.data.length) {
            result['facebook_' + type] = 0;
          } else {
            result['facebook_' + type] = data.data.data[0][type];
          }
          return result;
        });
      },
      twitterCountPromise: function () {
        var endPoint = 'http://urls.api.twitter.com/1/urls/count.json?url='+ url + '&callback=JSON_CALLBACK';
        return $http.jsonp(endPoint).then(function(data) {
          /* jshint camelcase: false */
          return {twitter_count: data.data.count};
        });
      },
      getAllCount: function () {
        var promises = [];
        promises.push(this.facebookCountPromise('total_count'));
        promises.push(this.facebookCountPromise('like_count'));
        promises.push(this.facebookCountPromise('share_count'));
        promises.push(this.facebookCountPromise('comment_count'));
        promises.push(this.twitterCountPromise());

        // return twitterPromise;
        return $q.all(promises).then(function(result) {
          var resultData = {};
          angular.forEach(result, function(value) {
            angular.extend(resultData, value);
          });
          return resultData;
        });
      }
    };
  }]);

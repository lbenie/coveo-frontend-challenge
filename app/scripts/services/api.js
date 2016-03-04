'use strict';

angular.module('coveoFrontendChallengeApp')
  .factory('api', function($http) {
    // Service logic
    // ...

    var baseUrl = 'https://cloudplatform.coveo.com/rest/search?access_token=6318103b-f9da-437c-854b-9e6f1f44e27b';

    // Public API here
    return {
      wineByType: function(options) {
        return $http.get(baseUrl + '&q=@tpcepagenomsplitgroup==' + options.type);
      },
      wine: function() {
        return $http.get(baseUrl);
      }
    };
  });

'use strict';

angular.module('coveoFrontendChallengeApp')
  .factory('api', function($http) {
    // Service logic
    // ...

    var baseUrl = 'https://cloudplatform.coveo.com/rest/search?access_token=6318103b-f9da-437c-854b-9e6f1f44e27b&q=';

    // Public API here
    return {
      wineByType: function(options) {
        return $http.get(baseUrl + '@tpcepagenomsplitgroup==' + options.type);
      }
    };
  });

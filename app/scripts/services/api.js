'use strict';

angular.module('coveoFrontendChallengeApp')
  .factory('api', function($http) {
    // Service logic
    // ...

    var token = '6318103b-f9da-437c-854b-9e6f1f44e27b';
    var baseUrl = 'https://cloudplatform.coveo.com/rest/search?access_token=' + token;
    var baseOptions = {
      type: '&q=@tpcepagenomsplitgroup==',
      country: '&q=@tppays==',
      year: '&q=@tpmillesime==',
      producer: '&q@=tpproducteur',
      nbrResult: '&numberOfResults='
    };
    var advancedOptions = {
      test: ''
    }

    // Public API here
    return {
      simple: {
        wineByType: function(options) {
          return $http.get(baseUrl + baseOptions.type + options.type + baseOptions.nbrResult + options.size);
        },
        wineByCountry: function(options) {
          return $http.get(baseUrl + baseOptions.country + options.country + baseOptions.nbrResult + options.size);
        },
        wineByYear: function(options) {
          return $http.get(baseUrl + baseOptions.year + options.year + baseOptions.nbrResult + options.size);
        },
        wineByProducer: function(options) {
          return $http.get(baseUrl + baseOptions.producer + options.producer + baseOptions.nbrResult + options.size);
        },
        wine: function(options) {
          return $http.get(baseUrl + baseOptions.nbrResult + options.size);
        }
      },
      advanced: {
        wines: function(options) {
          // iterate over all function

          return $http.post()
        }
      }
    };
  });

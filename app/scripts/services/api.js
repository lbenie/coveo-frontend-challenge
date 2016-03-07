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
      price: '&q=@tpprixnum==',
      query: '&q==',
      nbrResult: '&numberOfResults='
    };
    var advancedOptions = {
      type: '@tpcepagenomsplitgroup==',
      country: '@tppays==',
      year: '@tpmillesime==',
      price: '@tpprixnum=='
    };

    // Public API here
    return {
      simple: {
        wineByType: function(options) {
          return $http.get(`${baseUrl}${baseOptions.type}${options.type}${baseOptions.nbrResult}${options.size}`);
        },
        wineByCountry: function(options) {
          return $http.get(`${baseUrl}${baseOptions.country}${options.country}${baseOptions.nbrResult}${options.size}`);
        },
        wineByYear: function(options) {
          return $http.get(`${baseUrl}${baseOptions.year}${options.year}${baseOptions.nbrResult}${options.size}`);
        },
        wineByPrice: function(options) {
          return $http.get(`${baseUrl}${baseOptions.price}${options.price}${baseOptions.nbrResult}${options.size}`);
        },
        wine: function(options) {
          return $http.get(`${baseUrl}${baseOptions.nbrResult}${options.size}`);
        },
        wineByQuery: function(options) {
          return $http.get(`${baseUrl}${baseOptions.query}${options.normal}${baseOptions.nbrResult}${options.size}`);
        }
      },
      advanced: {
        wine: function(options) {
          var query = '';
          var object = {};
          if (angular.isDefined(options.query)) {
            object.q = options.query;
          }

          angular.forEach(options, function(value) {
            if (value.flag) {
              query += advancedOptions[value.name] + '(';
              for (var i = 0; i < value.value.length; i++) {
                if (i !== value.value.length - 1) {
                  query += value.value[i] + ',';
                } else {
                  query += value.value[i];
                }
              }
              query += ')';
            }
          });
          object.aq = query;

          console.log(object);
          return $http.post(`${baseUrl}`, object);
        }
      }
    };
  });

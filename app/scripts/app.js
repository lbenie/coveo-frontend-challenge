'use strict';

angular
  .module('coveoFrontendChallengeApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angular-elastic-grid',
    'ui.bootstrap'
  ])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.interceptors.push(function($q, $rootScope) {
        return {
          request: function(config) {
            $rootScope.$broadcast('loading-started');
            return config || $q.when(config);
          },
          response: function(response) {
            $rootScope.$broadcast('loading-complete');
            return response || $q.when(response);
          }
        };
      });
  });

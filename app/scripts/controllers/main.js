'use strict';

angular.module('coveoFrontendChallengeApp')
  .controller('MainCtrl', function($scope, api) {
    $scope.isCollapse = true;
    $scope.wines = [];
    api.wineByType({type: 'Merlot'}).then(function(result) {
      console.log(result.data.results);
      $scope.wines = result.data.results;
    });
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

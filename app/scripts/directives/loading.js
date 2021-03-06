'use strict';

angular.module('coveoFrontendChallengeApp')
  .directive('loading', function() {
    return {
      template: '<div><i class="fa fa-spin fa-refresh fa-5x"/></div>',
      restrict: 'EA',
      link: function postLink(scope, element) {
        scope.$on('loading-started', function() {
          $('#list').hide();
          element.show();
        });
        scope.$on('loading-complete', function() {
          element.hide();
          $('#list').addClass('animated zoomIn');
          $('#list').show();
        });
      }
    };
  });

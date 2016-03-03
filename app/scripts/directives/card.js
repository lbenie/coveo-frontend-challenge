'use strict';

angular.module('coveoFrontendChallengeApp')
  .directive('card', function() {
    return {
      templateUrl: 'views/card.html',
      restrict: 'E',
      link: function postLink() {
        $('#show').on('click', function() {
            $('.card-reveal').slideToggle('slow');
          });

        $('.card-reveal .close').on('click', function() {
            $('.card-reveal').slideToggle('slow');
          });
      }
    };
  });

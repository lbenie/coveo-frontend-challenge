'use strict';

function setupData(value) {
  var item = {};

  function description() {
    item.description += '<br/><br/>';

    item.description += angular.isDefined(item.country) ?
    '<i class="fa fa-globe fa-lg"/>' + ' ' + item.country + '<br/>' : '';

    item.description += angular.isDefined(item.region) ?
    '<i class="fa fa-map-marker fa-lg"/>' + ' ' + item.region + '<br/>' : '';

    item.description += angular.isDefined(item.temperature) ?
    '<i class="fa fa-glass fa-lg"/>' + ' ' + item.temperature + '<br/>' : '';

    item.description += angular.isDefined(item.producer) ?
    '<i class="fa fa-user fa-lg"/>' + ' ' + item.producer + '<br/>' : '';

    item.description += angular.isDefined(item.price) ?
    '<i class="fa fa-money fa-lg"/>' + ' ' + item.price + '<br/>' : '';

    return item.description;
  }


  item.title = value.tpnomdebouteille;
  item.price = value.tpprixnormal;
  item.color = value.tpcouleur;
  item.region = value.tpregion;
  item.country = value.tppays;
  item.producer = value.tpproducteur;

  item.description = angular.isDefined(value.tpcompagniedescription) ?
                     item.description = value.tpcompagniedescription : '';

  item.description = description();

  item.thumbnail = [value.tpthumbnailuri];
  item.large = [value.tpthumbnailuri];
  item.temperature = value.tptemperaturedeservice;
  item.taste = value.tppastilledegout;

  item.button_list = [{'title': 'En savoir plus', 'url': value.sysclickableuri}];
  item.tags = angular.isDefined(value.tpcepagenomsplitgroup) ? value.tpcepagenomsplitgroup.split(';') : [];

  return item;
}



angular.module('coveoFrontendChallengeApp')
  .controller('MainCtrl', function($scope, api) {
    $scope.wines = [];

    // api.wineByType({type: 'Merlot'})
    // .success(function(result) {
    //   angular.forEach(result.results, function(value) {
    //     $scope.wines.push(setupData(value.raw));
    //   });
    // })
    // .error(function(error) {
    //   alert(error);
    // });

    api.wine()
    .success(function(result) {
      angular.forEach(result.results, function(value) {
        $scope.wines.push(setupData(value.raw));
      });
    })
    .error(function(error) {
      alert(error);
    });
  });

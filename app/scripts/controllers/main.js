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
  item.tags = angular.isDefined(value.tppays) ? value.tppays.split(';') :
              angular.isDefined(value.tpcepagenomsplitgroup) ? value.tpcepagenomsplitgroup.split(';') : [];

  return item;
}


angular.module('coveoFrontendChallengeApp')
  .controller('MainCtrl', function($scope, api, $rootScope) {
    $rootScope.wines = [];
    $scope.option = '';
    $scope.simpleSearchParam = {};
    $scope.searchType = {};
    $scope.advancedSearchParam = {};
    var size = '';

    $('.search-panel #ss').find('a').click(function(e) {
      e.preventDefault();
      var param = $(this).attr('href').replace('#','');
      var concept = $(this).text();
      $('.search-panel span#search_size').text(concept);
      $('.input-group #search_param_param').val(param);
      size = param;
    });

    function simpleSearch(option) {
      switch (option) {
        case 'type':
          return api.simple.wineByType({type: $scope.option || 'merlot', size: size || '16'});
        case 'all':
          return api.simple.wine({size: size || '16'});
        case 'country':
          return api.simple.wineByCountry({country: $scope.option || 'france', size: size || '16'});
        case 'year':
          return api.simple.wineByYear({year: $scope.option || '2015', size: size || '16'});
        case 'producer':
          return api.simple.wineByProducer({producer: $scope.option || '', size: size || '16'});
      }
    }

    function advancedSearch(options) {
      // merge all options
    }

    function setupSearch(option) {
      // temporary holder for rearranging the data
      var myArray = [];
      if ($scope.searchType.simple || true) {
        var query = simpleSearch(option);
        query.success(function(result) {
          angular.forEach(result.results, function(value) {
            myArray.push(setupData(value.raw));
          });
          $rootScope.wines = myArray;
        }).error(function(error, status) {
          if (error) { alert(status); }
        });
      } else if ($scope.searchType.advanced) {
        var query = advancedSearch(option);
        query.success(function(result) {
          angular.forEach(result.results, function(value) {
            myArray.push(setupData(value.raw));
          });

          $rootScope.wines = myArray;
        }).error(function(error, status) {
          if (error) { alert(status); }
        });
      }
    }

    $scope.search = function() {
      console.log($scope.simpleSearchParam.type);
      if ($scope.simpleSearchParam.type) {
        setupSearch('type');
      }


      if ($scope.simpleSearchParam.year) {
        setupSearch('year');
      }


      if ($scope.simpleSearchParam.country) {
        setupSearch('country');
      }


      if ($scope.simpleSearchParam.producer) {
        setupSearch('producer');
      }
    };

    $scope.init = function() {
      $scope.searchType.simple = false;
      $scope.searchType.advanced = false;
    }

    // first call to setup wines
    setupSearch('all');

  });

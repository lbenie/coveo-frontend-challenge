'use strict';

// format the data for angular-elastic-grid
// https://github.com/lbenie/angular-elastic-grid#usage
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
    // has to be root because of scoping issues
    $rootScope.wines = [];

    $scope.searchInput = '';
    $scope.simpleSearchParam = {};
    $scope.advancedSearchParam = {};
    $scope.searchType = {};

    $scope.typeaheadTypes = ['gamay', 'grenache', 'cabernet franc', 'cabernet sauvignon', 'tannat', 'tempranillo', 'zinfandel', 'auxerois', 'cot', 'malbec', 'pinot noir', 'nebbiolo', 'sangioevese', 'merlot'];

    $scope.typeaheadCountries = ['canada', 'france', 'argentine', 'mexique', 'italie', 'liban', 'espagne', 'australie', 'tunisie', 'belgique', 'macédoine', 'luxembourg', 'hongrie'];

    var first = true;
    var size = '';

    $('.search-panel #ss').find('a').click(function(e) {
      e.preventDefault();
      var param = $(this).attr('href').replace('#','');
      var concept = $(this).text();
      $('.search-panel span#search_size').text(concept);
      $('.input-group #search_param_param').val(param);
      size = param;
    });

    // simple search api calls
    function simpleSearch(option) {
      switch (option) {
        case 'type':
          return api.simple.wineByType({type: $scope.searchInput.mainBar || 'merlot', size: size || 16});
        case 'all':
          return api.simple.wine({size: size || 16});
        case 'country':
          return api.simple.wineByCountry({country: $scope.searchInput.mainBar || 'france', size: size || 16});
        case 'year':
          return api.simple.wineByYear({year: $scope.searchInput.mainBar || 2015, size: size || 16});
        case 'price':
          return api.simple.wineByPrice({price: $scope.searchInput.mainBar || 21, size: size || 16});
        case 'normal':
        return api.simple.wineByQuery({normal: $scope.searchInput.mainBar || 'canada', size: size || 16});
      }
    }

    // advanced search api call
    function advancedSearch(options) {
      options.size = size || 16;
      return api.advanced.wine(options);
    }

    function setupSearch(option) {
      // temporary holder for rearranging the data
      var myArray = [];
      if ($scope.searchType.simple || first) {
        first = false;
        simpleSearch(option)
          .success(function(result) {
          angular.forEach(result.results, function(value) {
            // setup data for angular-elastic-grid
            myArray.push(setupData(value.raw));
          });
          $rootScope.wines = myArray;
        }).error(function(error, status) {
          if (error) { alert('Error from server with status code : ' + status); }
        });
      } else if ($scope.searchType.advanced) {
        advancedSearch(option)
          .success(function(result) {
          angular.forEach(result.results, function(value) {
            // setup data for angular-elastic-grid
            myArray.push(setupData(value.raw));
          });
          $rootScope.wines = myArray;
        }).error(function(error, status) {
          if (error) { alert('Error from server with status code : ' + status); }
        });
      }
    }

    // search function
    $scope.search = function() {
      if ($scope.searchType.simple) {
        if ($scope.simpleSearchParam.type) {
          setupSearch('type');
        }

        else if ($scope.simpleSearchParam.year) {
          setupSearch('year');
        }

        else if ($scope.simpleSearchParam.country) {
          setupSearch('country');
        }

        else if ($scope.simpleSearchParam.price) {
          setupSearch('price');
        }

        else {
          setupSearch('normal');
        }
      } else if ($scope.searchType.advanced) {
        // check for options
        var options = {};
        options.query = $scope.searchInput.mainBar;
        var values = [];

        if ($scope.advancedSearchParam.type) {
          values = [];
          angular.forEach($scope.advancedSearchParam.sub.type, function(v, key) {
            values.push(key);
          });

          if (angular.isDefined($scope.searchInput.typeBar)) {
            values.push($scope.searchInput.typeBar || '');
          }
          options.type = {
            flag: $scope.advancedSearchParam.type,
            name: 'type',
            value: values || 'merlot'
          };
        }

        if ($scope.advancedSearchParam.year) {
          values = [];
          if ($scope.advancedSearchParam.sub.year.thousandeight) {
            values.push(2008);
          }
          if ($scope.advancedSearchParam.sub.year.thousandten) {
            values.push(2010);
          }
          if ($scope.advancedSearchParam.sub.year.thousandfifthteen) {
            values.push(2015);
          }

          if (angular.isDefined($scope.searchInput.yearBar)) {
            values.push($scope.searchInput.yearBar || '');
          }

          options.year = {
            flag: $scope.advancedSearchParam.year,
            name: 'year',
            value: values || 2015
          };
        }

        if ($scope.advancedSearchParam.country) {
          values = [];
          angular.forEach($scope.advancedSearchParam.sub.country, function(v, key) {
            values.push(key);
          });

          if (angular.isDefined($scope.searchInput.countryBar)) {
            values.push($scope.searchInput.countryBar || '');
          }

          options.country = {
            flag: $scope.advancedSearchParam.country,
            name: 'country',
            value: values || 'france'
          };
        }

        if ($scope.advancedSearchParam.price) {
          values = [];

          if ($scope.advancedSearchParam.sub.price.twenty) {
            values.push(20);
          }

          if ($scope.advancedSearchParam.sub.price.thirty) {
            values.push(30);
          }

          if ($scope.advancedSearchParam.sub.price.sixty) {
            values.push(60);
          }

          if (angular.isDefined($scope.searchInput.priceBar)) {
            values.push($scope.searchInput.priceBar || '');
          }
          options.price = {
            flag: $scope.advancedSearchParam.price,
            name: 'price',
            value: values || 30
          };
        }


        setupSearch(options);
      }
    };

    // collapse
    $scope.init = function() {
      $scope.searchType.simple = false;
      $scope.searchType.advanced = false;
    };

    // first call to setup wines
    setupSearch('all');
  });

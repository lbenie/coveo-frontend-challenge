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
  item.tags = angular.isDefined(value.tppays) ? value.tppays.split(';') : [];

  return item;
}

angular.module('coveoFrontendChallengeApp')
  .controller('MainCtrl', function($scope, api, $q, $rootScope) {
    var qPromise = $q.defer();

    $scope.simpleSearchOptions = [{
      name: 'Par type',
      val: 0
    }];
    $rootScope.wines = [];

    // api.simple.wine()
    //   .success(function(result) {
    //     var myArray = [];
    //     angular.forEach(result.results, function(value) {
    //       myArray.push(setupData(value.raw));
    //     });
    //     $rootScope.wines = myArray;
    //   })
    //   .error(function(error, status) {
    //     if (error) { this.alert(status); }
    //   });

    function simpleSearch(option) {
     switch (option) {
        case 0:
          return api.simple.wineByType({type: 'Merlot'});
        case 1:
          return api.simple.wine();
     }
   }

   function search(option) {
      // temporary holder for rearranging the data
      var myArray = [];
      var query = simpleSearch(option);

      query.success(function(result) {
        angular.forEach(result.results, function(value) {
          myArray.push(setupData(value.raw));
        });
        qPromise.resolve(myArray);
      }).error(function(error, status) {
        if (error) { this.alert(status); }
      });

      return qPromise.promise;
    }

    $scope.realSearch = function(option) {
      search(option).then(function(result) {
        $rootScope.wines = result;
      });
    };


    // $scope.realSearch(1);
  });

'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('coveoFrontendChallengeApp'));
  
  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a lot lists and objets to the scope', function() {
    expect(scope.typeaheadTypes.length).toBe(14);
    expect(scope.typeaheadCountries.length).toBe(12);
    expect(scope.wines.length).toBe(0);
  });
});

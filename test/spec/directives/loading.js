'use strict';

describe('Directive: loading', function() {

  // load the directive's module
  beforeEach(module('coveoFrontendChallengeApp'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<loading></loading>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.html().toBe('<div><i class="fa fa-spin fa-refresh fa-5x"/></div>'));
  }));
});

'use strict';

describe('Directive: timeFromNow', function () {

  // load the directive's module
  beforeEach(module('sfDashApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<time-from-now></time-from-now>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the timeFromNow directive');
  }));
});

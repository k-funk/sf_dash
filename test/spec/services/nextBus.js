'use strict';

describe('Service: nextBus', function () {

  // load the service's module
  beforeEach(module('sfDashApp'));

  // instantiate service
  var nextBus;
  beforeEach(inject(function (_nextBus_) {
    nextBus = _nextBus_;
  }));

  it('should do something', function () {
    expect(!!nextBus).toBe(true);
  });

});
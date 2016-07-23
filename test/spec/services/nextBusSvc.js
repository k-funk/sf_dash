'use strict';

describe('Service: nextBusSvc', function () {

  // load the service's module
  beforeEach(module('sfDashApp'));

  // instantiate service
  var nextBusSvc;
  beforeEach(inject(function (_nextBusSvc_) {
    nextBusSvc = _nextBusSvc_;
  }));
});

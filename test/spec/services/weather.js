'use strict';

describe('Service: weather', function () {

  // load the service's module
  beforeEach(module('sfDashApp'));

  // instantiate service
  var weather;
  beforeEach(inject(function (_weather_) {
    weather = _weather_;
  }));
});

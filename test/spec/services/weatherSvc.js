'use strict';

describe('Service: weatherSvc', function () {

  // load the service's module
  beforeEach(module('sfDashApp'));

  // instantiate service
  var weatherSvc;
  beforeEach(inject(function (_weather_) {
    weatherSvc = _weather_;
  }));
});

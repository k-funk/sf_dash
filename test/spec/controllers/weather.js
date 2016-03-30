'use strict';

describe('Controller: WeatherCtrl', function () {

  // load the controller's module
  beforeEach(module('sfDashApp'));

  var WeatherCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WeatherCtrl = $controller('WeatherCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});

'use strict';

describe('Controller: NextbusCtrl', function () {

  // load the controller's module
  beforeEach(module('sfDashApp'));

  var NextbusCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NextbusCtrl = $controller('NextbusCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});

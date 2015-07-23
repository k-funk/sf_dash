'use strict';

/**
 * @ngdoc function
 * @name sfDashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('MainCtrl', function ($scope, nextBus, weather) {
    var stopIds = [
      '67|6208',
      '27|3930',
      '12|7552'
    ];
    // TODO: Allow multiple locations
    $scope.loc1 = '94110';

    nextBus.getPredictions(stopIds)
      .then(function (predictions) {
        $scope.predictions = predictions;
      });

    weather.getHourlyForecast($scope.loc1)
      .then(function (hForecasts) {
        $scope.hForecasts = hForecasts;
      });
  });


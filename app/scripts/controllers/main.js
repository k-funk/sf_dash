'use strict';

/**
 * @ngdoc function
 * @name sfDashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('MainCtrl', function ($scope, $interval, nextBus, weather) {
    var stopIds = [
      '67|6208',
      '27|3930',
      '12|7552'
    ], intervals = [];
    // TODO: Allow multiple locations
    $scope.loc1 = '94110';
    // soma: 94103, north soma: 94105

    var updatePredictions = function () {
      nextBus.getPredictions(stopIds)
        .then(function (predictions) {
          $scope.predictions = predictions;
        });
    };
    updatePredictions();
    intervals.push(
      $interval(updatePredictions, 15 * 1000)
    );

    var updateWeather = function () {
      weather.getHourlyForecast($scope.loc1)
        .then(function (hForecasts) {
          $scope.hForecasts = hForecasts;
        });
    };
    updateWeather();
    intervals.push(
      $interval(updateWeather, 15 * 60 * 1000)
    );

    $scope.$on('$destroy', function() {
      angular.forEach(function (interval) {
        $interval.cancel(interval);
      });
    });
  });


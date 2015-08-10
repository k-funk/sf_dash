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
    var stopRouteTags = [
      '67|6208',
      '27|3930',
      '12|7552'
    ], intervals = [];
    // TODO: Allow multiple locations
    $scope.loc1 = '94110';
    // soma: 94103, north soma: 94105

    var updatePredictions = function () {
      nextBus.getPredictions(stopRouteTags)
        .then(function (predictions) {
          $scope.nextBus.predictions = predictions;
          $scope.nextBus._lastUpdated = moment();
        });
    };
    $scope.nextBus = {};
    updatePredictions();
    intervals.push(
      $interval(updatePredictions, 15 * 1000)
    );

    var updateWeather = function () {
      weather.getHourlyForecast($scope.loc1)
        .then(function (hForecasts) {
          $scope.weather.hForecasts = hForecasts;
          $scope.weather._lastUpdated = moment();
        }, function () {
          // Can't explicitly know why it failed.
          if (!angular.isDefined($scope.hForecasts)) {
            // Assume that this failure is due to no API Key
            $scope.weather._firstCallFailed = true;
          }
        });
    };
    $scope.weather = {};
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


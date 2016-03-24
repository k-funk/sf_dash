'use strict';

/**
 * @ngdoc function
 * @name sfDashApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('WeatherCtrl', function ($scope, $interval, weather) {
    $scope.minChanceOfRain = 30;
    $scope.forecastHourLimit = 23;
    $scope.loc1 = '94110';
    // soma: 94103, north soma: 94105
    $scope.weather = {};

    var getRainTime = function (hForecasts) {
      for (var i = 0; i < hForecasts.length; i++) {
        var pop = Number(hForecasts[i].pop);
        if (pop >= $scope.minChanceOfRain) {
          return hForecasts[i];
        }
      }
    };

    var updateWeather = function () {
      weather.getHourlyForecast($scope.loc1)
        .then(function (hForecasts) {
          hForecasts = hForecasts.slice(0, $scope.forecastHourLimit);
          $scope.weather.hForecasts = hForecasts;
          $scope.weather.rainTime = getRainTime(hForecasts);
          $scope.weather._lastUpdated = moment();
        }, function (response) {
          if (response.status === -1) {
            $scope.weather._callFailedReason = 'The request appears to have timed out. The server may be down.';
          } else {
            // Assume that this failure is due to no API Key
            $scope.weather._callFailedReason = 'First weather request failed. Make sure you\'ve supplied an API Key' +
              ' in the <a href="#/settings">settings</a>.';
          }
        });
    };
    updateWeather();
    $scope.intervals.push(
      $interval(updateWeather, 15 * 60 * 1000)
    );
  });

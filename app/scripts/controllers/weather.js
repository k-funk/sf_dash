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

    var getRainTime = function (hourlyForecasts) {
      for (var i = 0; i < hourlyForecasts.length; i++) {
        var pop = Number(hourlyForecasts[i].pop);
        if (pop >= $scope.minChanceOfRain) {
          return hourlyForecasts[i];
        }
      }
    };

    var updateWeather = function () {
      weather.getHourlyAndForecast($scope.loc1)
        .then(function (data) {
          var todaysForecast = data.forecast.simpleforecast.forecastday[0],
              hourlyForecasts = data.hourly_forecast.slice(0, $scope.forecastHourLimit);

          $scope.weather.todaysForecast = todaysForecast;
          $scope.weather.hourlyForecasts = hourlyForecasts;
          $scope.weather.rainTime = getRainTime(hourlyForecasts);
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

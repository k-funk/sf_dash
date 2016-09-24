'use strict';

/**
 * @ngdoc function
 * @name sfDashApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('WeatherCtrl', function ($scope, $interval, weatherSvc, WARNING_AFTER_N_MISSED_CALLS) {
    $scope.callInterval = 15 * 60 * 1000;
    $scope.msUntilWarning = $scope.callInterval * WARNING_AFTER_N_MISSED_CALLS;

    $scope.minChanceOfRain = 30;
    $scope.forecastHourLimit = 23;
    $scope.locations = ['94110'];

    $scope.weather = {
      locations: []
    };

    var getRainTime = function (hourlyForecasts) {
      for (var i = 0; i < hourlyForecasts.length; i++) {
        var pop = Number(hourlyForecasts[i].pop);
        if (pop >= $scope.minChanceOfRain) {
          return hourlyForecasts[i];
        }
      }
    };

    var updateWeather = function () {
      weatherSvc.getWeatherData($scope.locations)
        .then(function (locationsData) {
          angular.forEach(locationsData, function(data, idx) {
            var weatherData = {};

            var todaysForecast = data.forecast.simpleforecast.forecastday[0],
                hourlyForecasts = data.hourly_forecast.slice(0, $scope.forecastHourLimit),
                alerts = data.alerts;

            weatherData.todaysForecast = todaysForecast;
            weatherData.hourlyForecasts = hourlyForecasts;
            weatherData.rainTime = getRainTime(hourlyForecasts);
            weatherData.alerts = alerts;
            weatherData.zip = $scope.locations[idx];

            $scope.weather.locations[idx] = weatherData;
          });
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
      $interval(updateWeather, $scope.callInterval)
    );
  });

import angular from 'angular';
import moment from 'moment';


/**
 * @ngdoc function
 * @name sfDashApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('WeatherCtrl', ($scope, $interval, weatherSvc, WARNING_AFTER_N_MISSED_CALLS) => {
    $scope.callInterval = 15 * 60 * 1000;
    $scope.msUntilWarning = $scope.callInterval * WARNING_AFTER_N_MISSED_CALLS;

    $scope.minChanceOfRain = 30;
    $scope.forecastHourLimit = 23;
    $scope.locations = ['94110'];

    $scope.weather = {
      locations: [],
    };

    const getRainTime = hourlyForecasts => {
      for (let i = 0; i < hourlyForecasts.length; i++) {
        const pop = Number(hourlyForecasts[i].pop);
        if (pop >= $scope.minChanceOfRain) {
          return hourlyForecasts[i];
        }
      }
    };

    const updateWeather = () => {
      weatherSvc.getWeatherData($scope.locations)
        .then(locationsData => {
          angular.forEach(locationsData, (data, idx) => {
            const weatherData = {};

            const forecasts = data.forecast.simpleforecast.forecastday;
            const todaysForecast = forecasts[0];
            const hourlyForecasts = data.hourly_forecast.slice(0, $scope.forecastHourLimit);
            const { alerts } = data;

            weatherData.forecasts = forecasts;
            weatherData.todaysForecast = todaysForecast;
            weatherData.hourlyForecasts = hourlyForecasts;
            weatherData.rainTime = getRainTime(hourlyForecasts);
            weatherData.alerts = alerts;
            weatherData.zip = $scope.locations[idx];

            $scope.weather.locations[idx] = weatherData;
          });
          $scope.weather._lastUpdated = moment();
        }, response => {
          if (response.status === -1) {
            // this can also happen if there's a CORS issue
            $scope.weather._callFailedReason = 'The request appears to have timed out. The server may be down.';
          } else {
            // Assume that this failure is due to no API Key
            $scope.weather._callFailedReason = 'First weather request failed. Make sure you\'ve supplied an API Key'
              + ' in the <a href="#/settings">settings</a>.';
          }
        });
    };

    updateWeather();
    $scope.intervals.push(
      $interval(updateWeather, $scope.callInterval),
    );
  });

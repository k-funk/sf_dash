import angular from 'angular';
import moment from 'moment';
import 'moment-precise-range-plugin';

import { WARNING_AFTER_N_MISSED_CALLS } from '../constants';


const CALL_INTERVAL = 15 * 60 * 1000;
const MS_UNTIL_WARNING = CALL_INTERVAL * WARNING_AFTER_N_MISSED_CALLS;

angular.module('sfDashApp').controller(
  'WeatherCtrl',
  ['$scope', '$interval', '$localStorage', 'weatherSvc', ($scope, $interval, $localStorage, weatherSvc) => {
    $scope.locations = [
      { readable: 'Bernal Heights', lat: 37.7448205, long: -122.4100494 },
    ];

    $scope.weather = {
      msUntilWarning: MS_UNTIL_WARNING,
      weatherUnits: $localStorage.weatherUnits,
      locations: [],
    };

    const updateWeather = () => {
      weatherSvc.getWeatherData($scope.locations)
        .then(
          locationsData => {
            locationsData.forEach((data, idx) => {
              const { hourly, daily, alerts = [] } = data;
              $scope.weather.locations[idx] = {
                todaysForecast: daily.data[0],
                dailyForecasts: daily.data,
                hourlyForecasts: hourly.data,
                alerts,
                ...$scope.locations[idx],
              };
            });
            $scope.weather.lastUpdated = moment();
          },
          response => {
            if (response.status === -1) {
              // this can also happen if there's a CORS issue
              $scope.weather._callFailedReason = 'The request appears to have timed out. The server may be down.';
            } else {
              // Assume that this failure is due to no API Key
              $scope.weather._callFailedReason = 'First weather request failed. Make sure you\'ve supplied an API Key'
                + ' in the <a href="#/settings">settings</a>.';
            }
          },
        );
    };

    updateWeather();
    $scope.intervals.push(
      $interval(updateWeather, CALL_INTERVAL),
    );
  }],
);

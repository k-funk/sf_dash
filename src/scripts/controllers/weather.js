import angular from 'angular';
import moment from 'moment';
import 'moment-precise-range-plugin';

import { WARNING_AFTER_N_MISSED_CALLS } from '../constants';
import DarkSky from '../../integrations/darksky';


const CALL_INTERVAL = 15 * 60 * 1000;
const MS_UNTIL_WARNING = CALL_INTERVAL * WARNING_AFTER_N_MISSED_CALLS;

angular.module('sfDashApp').controller(
  'WeatherCtrl',
  ['$scope', '$interval', '$localStorage', ($scope, $interval, $localStorage) => {
    $scope.locations = [
      { readable: 'Bernal Heights', lat: 37.7448205, long: -122.4100494 },
    ];

    $scope.weather = {
      msUntilWarning: MS_UNTIL_WARNING,
      weatherUnits: $localStorage.weatherUnits,
      locations: [],
    };

    const updateWeather = async () => {
      try {
        const locations = await DarkSky.fetchAllLocationsWeatherData($scope.locations);

        locations.forEach((response, idx) => {
          const { hourly, daily, alerts = [] } = response.data;
          $scope.weather.locations[idx] = {
            todaysForecast: daily.data[0],
            dailyForecasts: daily.data,
            hourlyForecasts: hourly.data,
            alerts,
            ...$scope.locations[idx],
          };
        });
        $scope.weather.lastUpdated = moment();
      } catch (e) {
        console.error(e);
        // jsonp makes error handling difficult. just assume it was user error
        $scope.weather._callFailedError = true;
      }

      // force update for now
      $scope.$digest();
    };

    updateWeather();
    $scope.intervals.push(
      $interval(updateWeather, CALL_INTERVAL),
    );
  }],
);

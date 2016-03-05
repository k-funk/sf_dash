'use strict';

/**
 * @ngdoc service
 * @name sfDashApp.weather
 * @description
 * # weather
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .factory('weather', function ($http, $localStorage) {

    var timeoutMilSec = 7000,
        getUrl = function (type, query, testKey) {
      return 'http://api.wunderground.com/api/' +
      ($localStorage.weatherKey || testKey) + '/' +
      type + '/q/' + query + '.json';
    };


    return {
      getHourlyForecast: function (location) {
        return $http.get(getUrl('hourly', location), {timeout: timeoutMilSec})
          .then(function(data) {
            return data.data.hourly_forecast;
          });
      },
      validateKey: function (key) {
        return $http.get(getUrl('forecast', 'san_francisco,ca', key));
      },
      storeKey: function (key) {
        $localStorage.weatherKey = key;
      }
    };
  });

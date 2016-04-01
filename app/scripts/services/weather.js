'use strict';

/**
 * @ngdoc service
 * @name sfDashApp.weather
 * @description
 * # weather
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .constant('WEATHER_ICON_PATH', 'http://icons.wxug.com/i/c/v4/')
  .factory('weather', function ($http, $localStorage) {

    var timeoutMilSec = 7000,
        getUrl = function (type, query, testKey) {
      return 'http://api.wunderground.com/api/' +
      ($localStorage.weatherKey || testKey) + '/' +
      type + '/q/' + query + '.json';
    };

    return {
      getWeatherData: function (location) {
        return $http.get(getUrl('hourly/forecast/alerts', location), {timeout: timeoutMilSec})
          .then(function(data) {
            return data.data;
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

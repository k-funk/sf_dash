'use strict';

/**
 * @ngdoc service
 * @name sfDashApp.weather
 * @description
 * # weather
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .factory('weather', function ($http) {

    // TODO: put this in a file
    var key = 'nokey',
        apiUrl = 'http://api.wunderground.com/api/' + key;

    return {
      getHourlyForecast: function (location) {
        var forecastUrl = apiUrl + '/hourly/q/' + location + '.json';

        return $http.get(forecastUrl)
        .then(function(data){
          // TODO: need some error handling
          return data.data.hourly_forecast;
        });
      }
    };
  });

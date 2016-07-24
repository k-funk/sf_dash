'use strict';

/**
 * @ngdoc service
 * @name sfDashApp.weatherSvc
 * @description
 * # weatherSvc
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .constant('WEATHER_ICON_PATH', 'http://icons.wxug.com/i/c/v4/')
  .factory('weatherSvc', function ($http, $q, $localStorage) {

    var timeoutMilSec = 7000,
        getUrl = function (type, query, testKey) {
          return 'http://api.wunderground.com/api/' +
          ($localStorage.weatherKey || testKey) + '/' +
          type + '/q/' + query + '.json';
        },
        makeCallForLocation = function(location) {
          return $http.get(getUrl('hourly/forecast/alerts', location), {timeout: timeoutMilSec})
            .then(function(data) {
              return data.data;
            });
        };

    return {
      getWeatherData: function (locations) {
        var promises = [];
        angular.forEach(locations, function(location) {
          promises.push(makeCallForLocation(location));
        });
        return $q.all(promises)
          .then(function(promises) {
            return promises;
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

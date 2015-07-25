'use strict';

/**
 * @ngdoc service
 * @name sfDashApp.weather
 * @description
 * # weather
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .provider('weather', function () {

    this.key = 'PROVIDE_KEY';

    this.setKey = function (key) {
      if (key) {this.key = key;}
    };

    this.getUrl = function (type, query) {
      return 'http://api.wunderground.com/api/' + this.key + '/' +
      type + '/q/' + query + '.json';
    };

    this.$get = function ($http) {
      var self = this;
      return {
        getHourlyForecast: function (location) {
          return $http.get(self.getUrl('hourly', location))
          .then(function(data){
            // TODO: need some error handling
            return data.data.hourly_forecast;
          });
        }
      };
    };
  });

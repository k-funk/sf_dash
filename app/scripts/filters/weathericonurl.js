'use strict';

/**
 * @ngdoc filter
 * @name sfDashApp.filter:weatherIconUrl
 * @function
 * @description
 * # weatherIconUrl
 * Filter in the sfDashApp.
 */
angular.module('sfDashApp')
  .filter('weatherIconUrl', function (WEATHER_ICON_PATH) {
    return function (input) {
      if (!input) {return '';}
      return WEATHER_ICON_PATH + input + '.svg';
    };
  });

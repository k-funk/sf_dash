import angular from 'angular';


/**
 * @ngdoc filter
 * @name sfDashApp.filter:weatherIconUrl
 * @function
 * @description
 * # weatherIconUrl
 * Filter in the sfDashApp.
 */
angular.module('sfDashApp')
  .filter('weatherIconUrl', WEATHER_ICON_PATH => input => {
    if (!input) { return ''; }
    return `${WEATHER_ICON_PATH + input}.svg`;
  });

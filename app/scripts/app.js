'use strict';

/**
 * @ngdoc overview
 * @name sfDashApp
 * @description
 * # sfDashApp
 *
 * Main module of the application.
 */
angular
  .module('sfDashApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'xml'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  })
  .config(function (weatherProvider) {
    weatherProvider.setKey('YOUR_API_KEY');
  })
  .filter('time24to12', function () {
    return function (input) {
      // TODO: Can't remember if this is safe. FU js casting.
      input = Number(input);
      if (input === 0) {return 12;}
      else if (input >= 1 && input <= 12) {return input;}
      else {return input - 12;}
    };
  });

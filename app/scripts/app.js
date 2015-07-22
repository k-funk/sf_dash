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
  });

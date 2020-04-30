import angular from 'angular';

import mainTempl from '../views/main.html';
import settingsTempl from '../views/settings.html';

import MainNav from '../components/main_nav';
import CurrentDateTimeHeader from '../components/current_datetime_header';

import Weather from '../components/weather';
import Bus from '../components/bus';
import Settings from '../components/settings';

import headerTemplate from '../views/header.html';
import nextbusTemplate from '../views/bus.html';
import weatherTemplate from '../views/weather.html';


const TEMPLATE_PATH = 'views';

// This is what I'd prefer to use for template importing, but webpack has some issue with dynamic
// imports that somehow, causes random .scss partials to be loaded as a result of requiring an html
// file ex: `require('sample.html')`. To avoid going down that rabbit hole any further, I do this,
// since angular is on the outs anyways.

// /* eslint import/no-dynamic-require: 0, global-require: 0 */
// const TEMPLATE_CACHE = [
//   `${TEMPLATE_PATH}/header.html`,
//
//   `${TEMPLATE_PATH}/bus.html`,
//
//   `${TEMPLATE_PATH}/weather.html`,
// ].map(filename => ({
//   url: filename,
//   template: require(`../${filename}`),
// }));

const TEMPLATE_CACHE = [
  {
    url: `${TEMPLATE_PATH}/header.html`,
    template: headerTemplate,
  },

  {
    url: `${TEMPLATE_PATH}/bus.html`,
    template: nextbusTemplate,
  },

  {
    url: `${TEMPLATE_PATH}/weather.html`,
    template: weatherTemplate,
  },
];

const REACT_COMPONENTS = [
  Bus,
  CurrentDateTimeHeader,
  MainNav,
  Settings,
  Weather,
];

angular.module(
  'sfDashApp',
  [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'geolocation',
    'mgcrea.ngStrap',
    'react',
  ],
)
  .config(
    ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
      $locationProvider.hashPrefix('');
      $routeProvider
        .when('/', {
          template: mainTempl,
          controller: 'MainCtrl',
          controllerAs: 'main',
        })
        .when('/settings', {
          template: settingsTempl,
        })
        .otherwise({
          redirectTo: '/',
        });
    }],
  )
  .run(['$templateCache', $templateCache => {
    TEMPLATE_CACHE.forEach(t => $templateCache.put(t.url, t.template));
  }]);

REACT_COMPONENTS.forEach(component => {
  angular.module(
    'sfDashApp',
  ).value(component.name, component);
});

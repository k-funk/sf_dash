import angular from 'angular';

import mainTempl from '../views/main.html';
import settingsTempl from '../views/settings.html';

import CurrentDateTimeHeader from '../components/current_datetime_header';
import TimeSinceLastUpdated from '../components/time_since_last_updated';

// Weather
import WeatherIcon from '../components/weather/icon';
import HourlyForecast from '../components/weather/hourly_forecast';
import WeatherSidePanel from '../components/weather/side_panel';
import ThreeDayForecast from '../components/weather/three_day_forecast';

// Bus

// Settings
import DarkLightModeSelector from '../components/dark_light_mode_selector';

import headerTemplate from '../views/header.html';

import nextbusTemplate from '../views/nextbus.html';
import nextbusAddStopGeolocateTemplate from '../views/nextbus/add-stop-geolocate.html';
import nextbusAddStopManualTemplate from '../views/nextbus/add-stop-manual.html';
import nextbusPredictionsTemplate from '../views/nextbus/predictions.html';

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
//   `${TEMPLATE_PATH}/nextbus.html`,
//   `${TEMPLATE_PATH}/nextbus/add-stop-geolocate.html`,
//   `${TEMPLATE_PATH}/nextbus/add-stop-manual.html`,
//   `${TEMPLATE_PATH}/nextbus/predictions.html`,
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
    url: `${TEMPLATE_PATH}/nextbus.html`,
    template: nextbusTemplate,
  },
  {
    url: `${TEMPLATE_PATH}/nextbus/add-stop-geolocate.html`,
    template: nextbusAddStopGeolocateTemplate,
  },
  {
    url: `${TEMPLATE_PATH}/nextbus/add-stop-manual.html`,
    template: nextbusAddStopManualTemplate,
  },
  {
    url: `${TEMPLATE_PATH}/nextbus/predictions.html`,
    template: nextbusPredictionsTemplate,
  },

  {
    url: `${TEMPLATE_PATH}/weather.html`,
    template: weatherTemplate,
  },
];

const REACT_COMPONENTS = [
  CurrentDateTimeHeader,
  DarkLightModeSelector,
  HourlyForecast,
  TimeSinceLastUpdated,
  ThreeDayForecast,
  WeatherIcon,
  WeatherSidePanel,
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
          controller: 'SettingsCtrl',
          controllerAs: 'settings',
        })
        .otherwise({
          redirectTo: '/',
        });
    }],
  )
  .filter('time24to12', () => input => {
    // TODO: Can't remember if this is safe. FU js casting.
    input = Number(input);
    if (input === 0) { return 12; }
    if (input >= 1 && input <= 12) { return input; }
    return input - 12;
  })
  .run(['$templateCache', $templateCache => {
    TEMPLATE_CACHE.forEach(t => $templateCache.put(t.url, t.template));
  }]);

REACT_COMPONENTS.forEach(component => {
  angular.module(
    'sfDashApp',
  ).value(component.name, component);
});

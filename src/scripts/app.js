import angular from 'angular';

import mainTempl from '../views/main.html';
import settingsTempl from '../views/settings.html';

import WeatherAlerts from '../components/weather/alerts';


const TEMPLATE_PATH = 'views';
/* eslint import/no-dynamic-require: 0, global-require: 0 */
const TEMPLATE_CACHE = [
  `${TEMPLATE_PATH}/header.html`,

  `${TEMPLATE_PATH}/nextbus.html`,
  `${TEMPLATE_PATH}/nextbus/add-stop-geolocate.html`,
  `${TEMPLATE_PATH}/nextbus/add-stop-manual.html`,
  `${TEMPLATE_PATH}/nextbus/predictions.html`,

  `${TEMPLATE_PATH}/weather.html`,
  `${TEMPLATE_PATH}/weather/alerts.html`,
  `${TEMPLATE_PATH}/weather/forecast.html`,
  `${TEMPLATE_PATH}/weather/side-panel.html`,
  `${TEMPLATE_PATH}/weather/table.html`,
].map(filename => ({
  url: filename,
  template: require(`../${filename}`),
}));

const REACT_COMPONENTS = [
  WeatherAlerts,
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

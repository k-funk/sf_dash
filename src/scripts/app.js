import angular from 'angular';

import mainTempl from '../views/main.html';
import settingsTempl from '../views/settings.html';

import MainNav from 'app/components/main_nav';
import MainPage from 'app/components/main_page';
import SettingsPage from 'app/components/settings_page';

import headerTemplate from '../views/header.html';


const TEMPLATE_PATH = 'views';

const TEMPLATE_CACHE = [
  {
    url: `${TEMPLATE_PATH}/header.html`,
    template: headerTemplate,
  },
];

const REACT_COMPONENTS = [
  MainNav,
  MainPage,
  SettingsPage,
];

angular.module(
  'sfDashApp',
  [
    'ngRoute',
    'geolocation',
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

import angular from 'angular';


const TIMEOUT_MIL_SEC = 7000;

/**
 * @ngdoc service
 * @name sfDashApp.weatherSvc
 * @description
 * # weatherSvc
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .constant('WEATHER_ICON_PATH', 'http://icons.wxug.com/i/c/v4/')
  .factory('weatherSvc', ($http, $q, $localStorage) => {
    const getUrl = (type, query, testKey) => `http://api.wunderground.com/api/${
      $localStorage.weatherKey || testKey}/${
      type}/q/${query}.json`;

    const makeCallForLocation = location => (
      $http.get(getUrl('hourly/forecast/alerts', location), { timeout: TIMEOUT_MIL_SEC })
        .then(data => data.data)
    );

    return {
      getWeatherData: locations => {
        const promises = [];
        angular.forEach(locations, location => {
          promises.push(makeCallForLocation(location));
        });
        return $q.all(promises).then(p => p);
      },
      validateKey: key => $http.get(getUrl('forecast', 'san_francisco,ca', key)),
      storeKey: key => {
        $localStorage.weatherKey = key;
      },
    };
  });

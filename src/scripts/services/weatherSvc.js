import angular from 'angular';


// Example DarkSky Hourly Data
// {
//   'time': 1563930000,
//   'summary': 'Partly Cloudy',
//   'icon': 'partly-cloudy-day',
//   'precipIntensity': 0,
//   'precipProbability': 0,
//   'temperature': 61.83,
//   'apparentTemperature': 61.83,
//   'dewPoint': 55.15,
//   'humidity': 0.79,
//   'pressure': 1014.92,
//   'windSpeed': 11.74,
//   'windGust': 17.1,
//   'windBearing': 275,
//   'cloudCover': 0.15,
//   'uvIndex': 2,
//   'visibility': 10,
//   'ozone': 303.4,
// }

// Example D
// //   'time':1563692400,
// //   'summary':'Partly cloudy throughout the day.',
// //   'icon':'partly-cloudy-day',
// //   'sunriseTime':1563714332,
// //   'sunsetTime':1563766133,
// //   'moonPhase':0.66,
// //   'precipIntensity':0.0001,
// //   'precipIntensityMax':0.0017,
// //   'precipIntensityMaxTime':1563771600,
// //   'precipProbability':0.09,
// //   'precipType':'rain',
// //   'temperatureHigh':65.95,
// //   'temperatureHighTime':1563757200,
// //   'temperatureLow':56.69,
// //   'temperatureLowTime':1563800400,
// //   'apparentTemperatureHigh':65.95,
// //   'apparentTemperatureHighTime':1563757200,
// //   'apparentTemperatureLow':56.69,
// //   'apparentTemperatureLowTime':1563800400,
// //   'dewPoint':54.13,
// //   'humidity':0.81,
// //   'pressure':1013.6,
// //   'windSpeed':6.05,
// //   'windGust':12.09,
// //   'windGustTime':1563742800,
// //   'windBearing':258,
// //   'cloudCover':0.47,
// //   'uvIndex':10,
// //   'uvIndexTime':1563739200,
// //   'visibility':8.265,
// //   'ozone':305.1,
// //   'temperatureMin':55.82,
// //   'temperatureMinTime':1563721200,
// //   'temperatureMax':65.95,
// //   'temperatureMaxTime':1563757200,
// //   'apparentTemperatureMin':55.82,
// //   'apparentTemperatureMinTime':1563721200,
// //   'apparentTemperatureMax':65.95,
// //   'apparentTemperatureMaxTime':1563757200
// // }arkSky Daily Data
// {


// all params required
const getUrl = ({
  base = 'https://api.darksky.net/forecast',
  key,
  lat,
  long,
  exclude = 'minutely,flags,currently',
  lang = 'en',
}) => `${base}/${key}/${lat},${long}?exclude=${exclude}&lang=${lang}`;

/**
 * @ngdoc service
 * @name sfDashApp.weatherSvc
 * @description
 * # weatherSvc
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .factory('weatherSvc', ($http, $q, $localStorage, $sce) => {
    const fetchWeatherData = ({ lat, long, key }) => $http.jsonp(
      $sce.trustAsResourceUrl(getUrl({ lat, long, key })),
    ).then(results => {
      if (Number(results.status) === 200) { return results.data; }
      return $q.reject(results);
    });

    return {
      getWeatherData: locations => $q.all(
        locations.map(({ lat, long }) => (
          fetchWeatherData({ lat, long, key: $localStorage.weatherKey })
        )),
      ),
      validateKey: key => fetchWeatherData({ lat: 38, long: -122, key }),
      storeKey: key => { $localStorage.weatherKey = key; },
    };
  });

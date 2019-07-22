import angular from 'angular';


// July 2019: DarkSky's icon mapping is pretty dumb right now:
// "The only case where a daily icon will show a *-night value is partly-cloudy-night"

const DARK_SKY_ICON_MAP = {
  'clear-day': 'clear',
  'clear-night': 'clear',
  cloudy: 'cloudy',
  fog: 'fog',
  'partly-cloudy-day': 'partlycloudy',
  'partly-cloudy-night': 'partlycloudy',
  rain: 'rain',
  sleet: 'sleet',
  snow: 'snow',
  wind: 'wind',
};

angular.module('sfDashApp')
  .filter('weatherIconUrl', () => input => {
    if (!input) { return ''; }
    return `/src/images/weather-icons/${DARK_SKY_ICON_MAP[input] || 'unknown'}.svg`;
  });

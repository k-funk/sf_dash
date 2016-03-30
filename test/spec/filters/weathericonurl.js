'use strict';

describe('Filter: weatherIconUrl', function () {

  // load the filter's module
  beforeEach(module('sfDashApp'));

  // initialize a new instance of the filter before each test
  var weatherIconUrl,
      weatherIconPath;
  beforeEach(inject(function ($filter, WEATHER_ICON_PATH) {
    weatherIconUrl = $filter('weatherIconUrl');
    weatherIconPath = WEATHER_ICON_PATH;
  }));

  it('should return the input wrapped with the path to wunderground\'s svg img', function () {
    var text = 'cloudy';
    expect(weatherIconUrl(text)).toBe(weatherIconPath + text + '.svg');
  });

  it('should return an empty string if the input is undefined', function () {
    var text = undefined;
    expect(weatherIconUrl(text)).toBe('');
  });
});

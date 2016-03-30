'use strict';

describe('Filter: weatherIconUrl', function () {

  // load the filter's module
  beforeEach(module('sfDashApp'));

  // initialize a new instance of the filter before each test
  var weatherIconUrl;
  beforeEach(inject(function ($filter, WEATHER_ICON_PATH) {
    weatherIconUrl = $filter('weatherIconUrl');
  }));

  it('should return the input wrapped with the path to wunderground\'s svg img', function () {
    var text = 'cloudy';
    expect(weatherIconUrl(text)).toBe(WEATHER_ICON_PATH + text + '.svg');
  });

});

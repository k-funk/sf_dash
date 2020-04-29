import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import HourlyForecast from './index';


const SAMPLE_HOURLY_FORECAST = {
  time: 1563930000,
  summary: 'Partly Cloudy',
  icon: 'partly-cloudy-day',
  precipIntensity: 0,
  precipProbability: 0,
  temperature: 61.83,
  apparentTemperature: 61.83,
  dewPoint: 55.15,
  humidity: 0.79,
  pressure: 1014.92,
  windSpeed: 11.74,
  windGust: 17.1,
  windBearing: 275,
  cloudCover: 0.15,
  uvIndex: 2,
  visibility: 10,
  ozone: 303.4,
};

describe('outputs the expected tree when', () => {
  let wrapper;
  let hourlyForecasts;

  beforeEach(() => {
    hourlyForecasts = [
      { ...SAMPLE_HOURLY_FORECAST },
      { ...SAMPLE_HOURLY_FORECAST },
      { ...SAMPLE_HOURLY_FORECAST },
    ];
  });

  test('(default)', () => {
    wrapper = shallow((
      <HourlyForecast hourlyForecasts={[]} />
    ));
  });

  test('no hourlyForecasts', () => {
    wrapper = shallow((
      <HourlyForecast hourlyForecasts={hourlyForecasts} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

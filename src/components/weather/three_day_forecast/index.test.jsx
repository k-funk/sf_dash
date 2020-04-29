import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import ThreeDayForecast from './index';


const SAMPLE_DAILY_FORECAST = {
  time: 1563692400,
  summary: 'Partly cloudy throughout the day.',
  icon: 'partly-cloudy-day',
  sunriseTime: 1563714332,
  sunsetTime: 1563766133,
  moonPhase: 0.66,
  precipIntensity: 0.0001,
  precipIntensityMax: 0.0017,
  precipIntensityMaxTime: 1563771600,
  precipProbability: 0.09,
  precipType: 'rain',
  temperatureHigh: 65.95,
  temperatureHighTime: 1563757200,
  temperatureLow: 56.69,
  temperatureLowTime: 1563800400,
  apparentTemperatureHigh: 65.95,
  apparentTemperatureHighTime: 1563757200,
  apparentTemperatureLow: 56.69,
  apparentTemperatureLowTime: 1563800400,
  dewPoint: 54.13,
  humidity: 0.81,
  pressure: 1013.6,
  windSpeed: 6.05,
  windGust: 12.09,
  windGustTime: 1563742800,
  windBearing: 258,
  cloudCover: 0.47,
  uvIndex: 10,
  uvIndexTime: 1563739200,
  visibility: 8.265,
  ozone: 305.1,
  temperatureMin: 55.82,
  temperatureMinTime: 1563721200,
  temperatureMax: 65.95,
  temperatureMaxTime: 1563757200,
  apparentTemperatureMin: 55.82,
  apparentTemperatureMinTime: 1563721200,
  apparentTemperatureMax: 65.95,
  apparentTemperatureMaxTime: 1563757200,
};

describe('outputs the expected tree when', () => {
  let wrapper;
  let dailyForecasts;

  beforeEach(() => {
    dailyForecasts = [
      {}, // the first day gets sliced off anyways
      { ...SAMPLE_DAILY_FORECAST },
    ];
  });

  test('(default)', () => {
    wrapper = shallow((
      <ThreeDayForecast dailyForecasts={[]} />
    ));
  });

  test('no dailyForecasts', () => {
    wrapper = shallow((
      <ThreeDayForecast dailyForecasts={dailyForecasts} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

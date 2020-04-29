import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_HOURLY_FORECAST } from '../../../sample_data/darksky';
import HourlyForecast from './index';


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

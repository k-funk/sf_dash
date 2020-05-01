import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_HOURLY_FORECAST } from 'sample_data/darksky';

import TodaysRainForecast from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <TodaysRainForecast hourlyForecasts={[{ ...SAMPLE_HOURLY_FORECAST }]} />
    ));
  });

  test('it will not rain', () => {
    wrapper = shallow((
      <TodaysRainForecast hourlyForecasts={[]} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

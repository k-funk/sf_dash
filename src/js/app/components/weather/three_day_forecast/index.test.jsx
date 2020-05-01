import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_DAILY_FORECAST } from 'sample_data/darksky';

import ThreeDayForecast from './index';


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

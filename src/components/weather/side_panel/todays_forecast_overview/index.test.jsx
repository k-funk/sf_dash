import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_DAILY_FORECAST } from '../../../../sample_data/darksky';
import TodaysForecastOverview from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <TodaysForecastOverview todaysForecast={{ ...SAMPLE_DAILY_FORECAST }} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

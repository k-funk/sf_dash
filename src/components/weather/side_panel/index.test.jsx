import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import WeatherSidePanel from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    const location = {
      todaysForecast: {},
      rainForecast: {},
    };
    wrapper = shallow((
      <WeatherSidePanel location={location} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

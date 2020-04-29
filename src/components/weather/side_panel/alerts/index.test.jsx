import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_ALERT } from '../../../../sample_data/darksky';
import WeatherAlerts from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <WeatherAlerts />
    ));
  });

  test('there are alerts', () => {
    wrapper = shallow((
      <WeatherAlerts alerts={[{ ...SAMPLE_ALERT }]} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

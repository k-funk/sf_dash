import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_LOCATION } from '../../../sample_data/darksky';
import SidePanel from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <SidePanel
        dailyForecasts={[...SAMPLE_LOCATION.daily.data]}
        hourlyForecasts={[...SAMPLE_LOCATION.hourly.data]}
        alerts={[...SAMPLE_LOCATION.alerts]}
      />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

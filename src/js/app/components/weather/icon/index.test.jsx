import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import WeatherIcon from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('there is no icon', () => {
    wrapper = shallow((
      <WeatherIcon icon="" />
    ));
  });

  test('there is a valid icon', () => {
    wrapper = shallow((
      <WeatherIcon icon="cloudy" />
    ));
  });

  test('there is an invalid icon', () => {
    wrapper = shallow((
      <WeatherIcon icon="iminvalid" />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

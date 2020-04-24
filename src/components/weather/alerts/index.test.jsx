import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import WeatherAlerts from './index';


const SAMPLE_ALERT = {
  title: 'Flood Watch for Mason, WA',
  time: 1509993360,
  expires: 1510036680,
  description: '...FLOOD WATCH REMAINS IN EFFECT THROUGH LATE MONDAY NIGHT...\n',
  uri: 'http://alerts.weather.gov/cap/wwacapget.php?x=WA1255E4DB8494.FloodWatch.1255',
};

describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <WeatherAlerts />
    ));
  });

  test('there are alerts', () => {
    wrapper = shallow((
      <WeatherAlerts alerts={[SAMPLE_ALERT]} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

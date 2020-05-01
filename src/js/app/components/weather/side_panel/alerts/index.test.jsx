import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_ALERT } from 'sample_data/darksky';

import Alerts from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <Alerts />
    ));
  });

  test('there are alerts', () => {
    wrapper = shallow((
      <Alerts alerts={[{ ...SAMPLE_ALERT }]} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

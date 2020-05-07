import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_PREDICTION } from 'sample_data/nextbus';

import Predictions from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('predictions', () => {
    wrapper = shallow((
      <Predictions predictions={[{ ...SAMPLE_PREDICTION }]} />
    ));
  });

  test('no predictions', () => {
    wrapper = shallow((
      <Predictions predictions={[]} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

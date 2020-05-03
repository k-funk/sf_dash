import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_PREDICTION } from 'sample_data/nextbus';

import StopInfo from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('a prediction is passed', () => {
    wrapper = shallow((
      <StopInfo prediction={{ ...SAMPLE_PREDICTION }} />
    ));
  });

  test('a prediction is passed without a direction', () => {
    wrapper = shallow((
      <StopInfo prediction={{ ...SAMPLE_PREDICTION, direction: undefined }} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

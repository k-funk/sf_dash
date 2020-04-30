import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_PREDICTION } from '../../../sample_data/nextbus';
import Predictions from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('predictions', () => {
    const predictions = [
      { ...SAMPLE_PREDICTION },
    ];
    wrapper = shallow((
      <Predictions predictions={predictions} removeStopRoute={() => {}} />
    ));
  });

  test('no predictions', () => {
    wrapper = shallow((
      <Predictions predictions={[]} removeStopRoute={() => {}} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

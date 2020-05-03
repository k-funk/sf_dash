import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_PREDICTION } from 'sample_data/nextbus';

import Times from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('predictionTimes are passed', () => {
    const predictionTimes = [...SAMPLE_PREDICTION.direction.prediction];
    wrapper = shallow((
      <Times predictionTimes={predictionTimes} />
    ));
  });

  test('predictionTimes are not passed', () => {
    wrapper = shallow((
      <Times predictionTimes={[]} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

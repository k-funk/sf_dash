import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import moment from 'moment';

import { SAMPLE_LOCATION } from '../../sample_data/darksky';
import Weather from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      lastUpdated: moment(),
    };
  });

  test('there are errors', () => {
    wrapper = shallow((
      <Weather {...defaultProps} _callFailedError="Some error happened." />
    ));
  });

  test('there is at least one location in the array', () => {
    wrapper = shallow((
      <Weather {...defaultProps} locations={[{ ...SAMPLE_LOCATION }]} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

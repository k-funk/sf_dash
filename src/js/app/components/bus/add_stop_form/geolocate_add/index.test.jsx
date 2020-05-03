import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import GeolocateAdd from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      onAddOrRemoveStop: () => {},
    };
  });

  test('(default)', () => {
    wrapper = shallow((
      <GeolocateAdd {...defaultProps} />
    ));
  });

  test('loader is shown', () => {
    wrapper = shallow((
      <GeolocateAdd {...defaultProps} />
    ));
    wrapper.setState({ loading: true });
  });

  test('errMsg is shown', () => {
    wrapper = shallow((
      <GeolocateAdd {...defaultProps} />
    ));
    wrapper.setState({ errMsg: 'oh noes!' });
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

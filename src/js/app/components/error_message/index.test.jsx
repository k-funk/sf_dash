import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import ErrorMessage from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('no children', () => {
    wrapper = shallow((
      <ErrorMessage />
    ));
  });

  test('children', () => {
    wrapper = shallow((
      <ErrorMessage>
        some error message
      </ErrorMessage>
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

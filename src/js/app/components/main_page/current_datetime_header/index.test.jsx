import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import CurrentDateTimeHeader from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <CurrentDateTimeHeader />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('instance methods', () => {
  let instance;
  beforeEach(() => {
    instance = shallow((
      <CurrentDateTimeHeader />
    )).instance();
  });

  test('sets up interval for forceUpdating time', () => {
    expect(instance.interval).toEqual(expect.any(Number));
  });
});

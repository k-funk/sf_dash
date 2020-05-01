import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import moment from 'moment';
import 'moment-precise-range-plugin';

import TimeSinceLastUpdated from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('lastUpdated not passed', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated />
    ));
  });

  test('lastUpdated is now', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated lastUpdated={moment()} />
    ));
  });

  test('the update is not overdue', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated lastUpdated={moment().subtract(1, 'seconds')} />
    ));
  });

  test('the update is overdue', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated
        lastUpdated={moment().subtract(5, 'seconds')}
        msUntilWarning={3000}
      />
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
      <TimeSinceLastUpdated />
    )).instance();
  });

  test('sets up interval for forceUpdating time', () => {
    expect(instance.interval).toEqual(expect.any(Number));
  });
});

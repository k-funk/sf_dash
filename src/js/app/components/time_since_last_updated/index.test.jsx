import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import moment from 'moment';
import 'moment-precise-range-plugin';

import TimeSinceLastUpdated, { INTERVAL_MS } from './index';


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
  let wrapper;
  let instance;
  let setIntervalSpy;
  let clearIntervalSpy;

  beforeEach(() => {
    setIntervalSpy = jest.spyOn(window, 'setInterval').mockReturnValue(11);
    clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    wrapper = shallow((
      <TimeSinceLastUpdated />
    ));
    instance = wrapper.instance();
  });

  test('componentDidMount sets an interval', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated />
    ));

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), INTERVAL_MS);
    expect(instance.interval).toEqual(11);
  });

  test('componentWillUnmount clears an interval', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated />
    ));
    wrapper.unmount();

    expect(clearIntervalSpy).toHaveBeenCalledWith(11);
  });
});

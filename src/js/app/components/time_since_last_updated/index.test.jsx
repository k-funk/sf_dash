import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import { sub } from 'date-fns';

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
      <TimeSinceLastUpdated lastUpdated={new Date()} />
    ));
  });

  test('the update is not overdue', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated lastUpdated={sub(new Date(), { seconds: 1 })} />
    ));
  });

  test('the update is overdue', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated
        lastUpdated={sub(new Date(), { seconds: 5 })}
        msUntilWarning={3000}
      />
    ));
  });

  test('is loading', () => {
    wrapper = shallow((
      <TimeSinceLastUpdated lastUpdated={new Date()} loading />
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
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), INTERVAL_MS);
    expect(instance.interval).toEqual(11);
  });

  test('componentWillUnmount clears an interval', () => {
    wrapper.unmount();

    expect(clearIntervalSpy).toHaveBeenCalledWith(11);
  });
});

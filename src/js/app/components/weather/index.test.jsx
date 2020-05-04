import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import LocalStorage from 'app/utils/local_storage';
import DarkSky from 'app/integrations/darksky';
import { SAMPLE_LOCATION } from 'sample_data/darksky';

import Weather, { LOCATIONS, CALL_INTERVAL } from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let fetchAllLocationsWeatherDataSpy;

  beforeEach(() => {
    jest.spyOn(LocalStorage, 'get').mockReturnValue('foo');
    fetchAllLocationsWeatherDataSpy = jest.spyOn(DarkSky, 'fetchAllLocationsWeatherData')
      .mockReturnValue([]);
  });

  test('it initially loads', () => {
    wrapper = shallow((
      <Weather />
    ));
  });

  test('there are errors', () => {
    wrapper = shallow((
      <Weather />
    ));

    wrapper.setState({
      fetchError: true,
    });
  });

  test('state contains weather data', async () => {
    fetchAllLocationsWeatherDataSpy = jest.spyOn(DarkSky, 'fetchAllLocationsWeatherData')
      .mockReturnValue([{ data: { ...SAMPLE_LOCATION } }]);

    // updateWeatherLocations() gets called on componentDidMount
    wrapper = shallow((
      <Weather />
    ));

    expect(fetchAllLocationsWeatherDataSpy).toHaveBeenCalledWith(LOCATIONS, 'foo', 'foo');
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
      <Weather />
    ));
    instance = wrapper.instance();
  });

  test('componentDidMount sets an interval', () => {
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), CALL_INTERVAL);
    expect(instance.interval).toEqual(11);
  });

  test('componentWillUnmount clears an interval', () => {
    wrapper.unmount();

    expect(clearIntervalSpy).toHaveBeenCalledWith(11);
  });
});

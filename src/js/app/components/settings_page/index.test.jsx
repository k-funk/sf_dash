import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import * as LocalStorageUtils from 'app/utils/local_storage';

import Settings from './index';
import { getLocalStorage, WEATHER_KEY_KEY } from 'app/utils/local_storage';
import DarkSky from '../../integrations/darksky';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <Settings />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('instance methods', () => {
  let getLocalStorageSpy;
  let setLocalStorageSpy;
  let dumpLocalStorageSpy;
  let wrapper;
  let instance;

  beforeEach(() => {
    getLocalStorageSpy = jest.spyOn(LocalStorageUtils, 'getLocalStorage')
      .mockReturnValue('foo');
    setLocalStorageSpy = jest.spyOn(LocalStorageUtils, 'setLocalStorage').mockReturnValue();
    dumpLocalStorageSpy = jest.spyOn(LocalStorageUtils, 'dumpLocalStorage').mockReturnValue();
    wrapper = shallow((
      <Settings />
    ));
    instance = wrapper.instance();
  });

  test('getInitialState', () => {
    expect(instance.getInitialState()).toEqual({
      weatherKeyIsValid: undefined,
      weatherKeyValue: 'foo',
      weatherUnits: 'foo',
    });
  });

  test('onWeatherKeyChange', () => {
    const value = 'abc';

    instance.onWeatherKeyChange({ target: { value } });
    expect(instance.getInitialState()).toEqual({
      weatherKeyIsValid: undefined,
      weatherKeyValue: 'foo',
      weatherUnits: 'foo',
    });
    expect(wrapper.state().weatherKeyValue).toEqual(value);
  });

  describe('validateAndSetKey', () => {
    let weatherKeyValue;

    beforeEach(() => {
      weatherKeyValue = 'abc';
      wrapper.setState({ weatherKeyValue });
    });

    test('is valid key', async () => {
      const spy = jest.spyOn(DarkSky, 'isValidKey').mockReturnValue(true);

      await instance.validateAndSetKey({ preventDefault: () => {} });

      expect(spy).toHaveBeenCalledWith(weatherKeyValue);
      expect(wrapper.state().weatherKeyIsValid).toEqual(true);
      expect(setLocalStorageSpy).toHaveBeenCalledWith(LocalStorageUtils.WEATHER_KEY_KEY, weatherKeyValue);
    });

    test('is invalid key', async () => {
      const spy = jest.spyOn(DarkSky, 'isValidKey').mockReturnValue(false);

      await instance.validateAndSetKey({ preventDefault: () => {} });

      expect(spy).toHaveBeenCalledWith(weatherKeyValue);
      expect(wrapper.state().weatherKeyIsValid).toEqual(false);
    });
  });

  test('setWeatherUnits', () => {
    const units = 'c';

    instance.setWeatherUnits(units);

    expect(wrapper.state().weatherUnits).toEqual(units);
    expect(setLocalStorageSpy).toHaveBeenCalledWith(LocalStorageUtils.WEATHER_UNITS_KEY, units);
  });

  test('dumpLocalStorageAndResetState', () => {
    instance.dumpLocalStorageAndResetState();

    expect(wrapper.state()).toEqual(instance.getInitialState());
    expect(dumpLocalStorageSpy).toHaveBeenCalledWith();
  });
});
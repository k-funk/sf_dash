import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import LocalStorage, { WEATHER_UNITS_KEY, WEATHER_KEY_KEY } from 'app/utils/local_storage';
import DarkSky from 'app/integrations/darksky';

import Settings from './index';


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
  let localStorageGetSpy;
  let localStorageSetSpy;
  let dumpLocalStorageSpy;
  let wrapper;
  let instance;

  beforeEach(() => {
    localStorageGetSpy = jest.spyOn(LocalStorage, 'get')
      .mockReturnValue('foo');
    localStorageSetSpy = jest.spyOn(LocalStorage, 'set').mockReturnValue();
    dumpLocalStorageSpy = jest.spyOn(LocalStorage, 'dump').mockReturnValue();
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
    expect(localStorageGetSpy).toHaveBeenCalledWith(WEATHER_KEY_KEY);
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
      expect(localStorageSetSpy)
        .toHaveBeenCalledWith(WEATHER_KEY_KEY, weatherKeyValue);
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
    expect(localStorageSetSpy).toHaveBeenCalledWith(WEATHER_UNITS_KEY, units);
  });

  test('dumpLocalStorageAndResetState', () => {
    instance.dumpLocalStorageAndResetState();

    expect(wrapper.state()).toEqual(instance.getInitialState());
    expect(dumpLocalStorageSpy).toHaveBeenCalledWith();
  });


  test('button clicks call setWeatherUnits', () => {
    const spy = jest.spyOn(instance, 'setWeatherUnits');

    wrapper.find('Button').at(2).simulate('click');
    expect(spy).toHaveBeenCalledWith('');

    wrapper.find('Button').at(3).simulate('click');
    expect(spy).toHaveBeenCalledWith('f');

    wrapper.find('Button').at(4).simulate('click');
    expect(spy).toHaveBeenCalledWith('c');
  });
});

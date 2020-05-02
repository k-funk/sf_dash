import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import * as LocalStorageUtils from 'app/utils/local_storage';

import DarkLightModeSelector from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow((
      <DarkLightModeSelector />
    ));
    instance = wrapper.instance();
  });

  test('when dark mode is selected', () => {
    jest.spyOn(instance, 'isDarkModeSelected').mockReturnValue(true);
  });

  test('when light mode is selected', () => {
    jest.spyOn(instance, 'isDarkModeSelected').mockReturnValue(false);
  });

  afterEach(() => {
    instance.forceUpdate();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('instance methods', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow((
      <DarkLightModeSelector />
    ));
    instance = wrapper.instance();
  });

  test('setMode', () => {
    const mode = 'dark';
    const setLocalStorageSpy = jest.spyOn(LocalStorageUtils, 'setLocalStorage');
    const forceUpdateSpy = jest.spyOn(instance, 'forceUpdate');

    instance.setMode(mode);

    expect(setLocalStorageSpy).toHaveBeenCalledWith(LocalStorageUtils.HTML_CLASS_KEY, mode);
    expect(document.documentElement.className).toEqual(mode);
    expect(forceUpdateSpy).toHaveBeenCalled();
  });

  test('button clicks call setMode', () => {
    const spy = jest.spyOn(instance, 'setMode');

    wrapper.find('Button').at(0).simulate('click');
    expect(spy).toHaveBeenCalledWith('dark-mode');

    wrapper.find('Button').at(1).simulate('click');
    expect(spy).toHaveBeenCalledWith('light-mode');
  });
});

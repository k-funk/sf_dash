import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import LocalStorage, { BUS_ROUTE_STOP_TAGS_KEY } from 'app/utils/local_storage';

import DisplayLocalStorageData from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  beforeEach(() => {
    jest.spyOn(LocalStorage, 'get').mockReturnValue(['14|1234']);
  });

  test('when the data is not shown (default)', () => {
    wrapper = shallow((
      <DisplayLocalStorageData localStorageKey={BUS_ROUTE_STOP_TAGS_KEY} />
    ));
  });

  test('when the data is shown', () => {
    wrapper = shallow((
      <DisplayLocalStorageData localStorageKey={BUS_ROUTE_STOP_TAGS_KEY} />
    ));
    wrapper.instance().toggleShow();
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('instance methods', () => {
  let wrapper;
  let instance;
  let addEventListenerSpy;
  let removeEventListenerSpy;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    wrapper = shallow((
      <DisplayLocalStorageData localStorageKey={BUS_ROUTE_STOP_TAGS_KEY} />
    ));
    instance = wrapper.instance();
  });

  test('componentDidMount sets an interval', () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', instance.rerender);
  });

  test('componentWillUnmount clears an interval', () => {
    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', instance.rerender);
  });
});

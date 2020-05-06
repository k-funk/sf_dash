import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import LocalStorage, { BUS_STOP_ROUTE_TAGS_KEY } from 'app/utils/local_storage';

import SetSampleLocalStorageData from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <SetSampleLocalStorageData localStorageKey={BUS_STOP_ROUTE_TAGS_KEY} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('instance methods', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow((
      <SetSampleLocalStorageData localStorageKey={BUS_STOP_ROUTE_TAGS_KEY} />
    ));
    instance = wrapper.instance();
  });

  test('setSampleData', () => {
    const spy = jest.spyOn(LocalStorage, 'setSampleData');

    instance.setSampleData();

    expect(spy).toHaveBeenCalledWith(BUS_STOP_ROUTE_TAGS_KEY);
  });
});

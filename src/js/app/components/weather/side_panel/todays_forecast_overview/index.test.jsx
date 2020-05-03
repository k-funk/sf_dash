import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import LocalStorage from 'app/utils/local_storage';
import { SAMPLE_DAILY_FORECAST } from 'sample_data/darksky';

import TodaysForecastOverview, { cToF, fToC } from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('localStorage weather units was not set', () => {
    wrapper = shallow((
      <TodaysForecastOverview todaysForecast={{ ...SAMPLE_DAILY_FORECAST }} />
    ));
  });

  test('localStorage weather units was set to c', () => {
    jest.spyOn(LocalStorage, 'get').mockReturnValue('c');

    wrapper = shallow((
      <TodaysForecastOverview todaysForecast={{ ...SAMPLE_DAILY_FORECAST }} />
    ));
  });

  test('localStorage weather units was set to f', () => {
    jest.spyOn(LocalStorage, 'get').mockReturnValue('f');

    wrapper = shallow((
      <TodaysForecastOverview todaysForecast={{ ...SAMPLE_DAILY_FORECAST }} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

test('cToF', () => {
  expect(cToF(22)).toEqual(71.6);
  expect(cToF(0)).toEqual(32);
  expect(cToF(40)).toEqual(104);
});

test('fToC', () => {
  expect(fToC(0)).toEqual(-17.77777777777778);
  expect(fToC(32)).toEqual(0);
  expect(fToC(73)).toEqual(22.77777777777778);
  expect(fToC(100)).toEqual(37.77777777777778);
});

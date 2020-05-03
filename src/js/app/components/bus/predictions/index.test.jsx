import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import * as LocalStorageUtils from 'app/utils/local_storage';
import { SAMPLE_PREDICTION } from 'sample_data/nextbus';

import Predictions from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      predictions: [
        { ...SAMPLE_PREDICTION },
      ],
      onAddOrRemoveStop: () => {},
      showBusRemove: false,
    };
  });

  test('predictions', () => {
    wrapper = shallow((
      <Predictions {...defaultProps} />
    ));
  });

  test('no predictions', () => {
    wrapper = shallow((
      <Predictions {...defaultProps} predictions={[]} />
    ));
  });

  test('bus removal button is shown', () => {
    wrapper = shallow((
      <Predictions {...defaultProps} showBusRemove />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('instance methods', () => {
  let wrapper;
  let instance;
  let onAddOrRemoveStopSpy;
  let routeTag;
  let stopTag;

  beforeEach(() => {
    routeTag = SAMPLE_PREDICTION._routeTag;
    stopTag = SAMPLE_PREDICTION._stopTag;
    onAddOrRemoveStopSpy = jest.fn();
    const defaultProps = {
      predictions: [
        { ...SAMPLE_PREDICTION },
      ],
      onAddOrRemoveStop: onAddOrRemoveStopSpy,
      showBusRemove: true,
    };

    wrapper = shallow((
      <Predictions {...defaultProps} />
    ));
    instance = wrapper.instance();
  });

  test('removeStop', () => {
    const removeBusStopFromLocalStorageSpy = jest.spyOn(LocalStorageUtils, 'removeBusStopFromLocalStorage');

    instance.removeStop(routeTag, stopTag);

    expect(removeBusStopFromLocalStorageSpy).toHaveBeenCalledWith(`${routeTag}|${stopTag}`);
    expect(onAddOrRemoveStopSpy).toHaveBeenCalledWith();
  });

  test('button clicks call removeStop', () => {
    const spy = jest.spyOn(instance, 'removeStop');

    wrapper.find('Button').simulate('click');
    expect(spy).toHaveBeenCalledWith(routeTag, stopTag);
  });
});

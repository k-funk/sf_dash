import React from 'react';
import { shallow, mount } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_PREDICTION } from 'sample_data/nextbus';
import LocalStorage from 'app/utils/local_storage';
import NextBus from 'app/integrations/nextbus';

import Bus, { CALL_INTERVAL, sortPredictions } from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let getPredictionsSpy;

  beforeEach(() => {
    jest.spyOn(LocalStorage, 'get').mockReturnValue([]);
  });

  test('(default)', () => {
    wrapper = shallow((
      <Bus />
    ));
  });

  test('state contains prediction data', async () => {
    const prediction = { ...SAMPLE_PREDICTION };
    const stopRouteTags = [NextBus.getRouteStopTag(prediction._routeTag, prediction._stopTag)];
    jest.spyOn(LocalStorage, 'get').mockReturnValue(stopRouteTags);
    getPredictionsSpy = jest.spyOn(NextBus, 'getPredictions')
      .mockImplementation(() => Promise.resolve(
        { body: { predictions: [prediction] } },
      ));

    // updateBusPredictions() gets called on componentDidMount
    wrapper = shallow((
      <Bus />
    ));

    expect(getPredictionsSpy).toHaveBeenCalledWith(stopRouteTags);
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
  let updateBusPredictionsSpy;

  beforeEach(() => {
    setIntervalSpy = jest.spyOn(window, 'setInterval').mockReturnValue(11);
    clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    updateBusPredictionsSpy = jest.spyOn(Bus.prototype, 'updateBusPredictions')
      .mockImplementation(() => Promise.resolve());
    wrapper = mount((
      <Bus />
    ));
    instance = wrapper.instance();
  });

  test('componentDidMount sets an interval', () => {
    expect(updateBusPredictionsSpy).toHaveBeenCalledWith();
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), CALL_INTERVAL);
    expect(instance.interval).toEqual(11);
  });

  test('componentWillUnmount clears an interval', () => {
    wrapper.unmount();

    expect(clearIntervalSpy).toHaveBeenCalledWith(11);
  });

  test('toggleAddStopForm', () => {
    expect(wrapper.state().showAddStopForm).toEqual(false);

    instance.toggleAddStopForm();

    expect(wrapper.state().showAddStopForm).toEqual(true);
  });

  test('onAddOrRemoveStop', () => {
    instance.onAddOrRemoveStop();

    expect(clearIntervalSpy).toHaveBeenCalledWith(11);
    expect(updateBusPredictionsSpy).toHaveBeenCalledWith();
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), CALL_INTERVAL);
    expect(instance.interval).toEqual(11);
  });

  test('toggleShowBusRemove', () => {
    expect(wrapper.state().showBusRemove).toEqual(false);

    instance.toggleShowBusRemove();

    expect(wrapper.state().showBusRemove).toEqual(true);
  });

  describe('updateBusPredictions', () => {
    // note: success is tested above with snapshot testing
    test('fails to get predicitons', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');
      const prediction = { ...SAMPLE_PREDICTION };
      const stopRouteTags = [NextBus.getRouteStopTag(prediction._routeTag, prediction._stopTag)];
      const errMsg = 'oh noes!';
      updateBusPredictionsSpy.mockRestore(); // it is mocked above
      jest.spyOn(LocalStorage, 'get').mockReturnValue(stopRouteTags);
      jest.spyOn(NextBus, 'getPredictions')
        .mockImplementation(() => Promise.reject(new Error(errMsg)));

      await instance.updateBusPredictions();

      expect(consoleErrorSpy).toHaveBeenCalledWith(errMsg);
    });
  });
});

describe('sortPredictions', () => {
  test('if no predictions', () => {
    expect(sortPredictions([], undefined)).toEqual([]);
  });

  test('if predictions come in unsorted, they get sorted', () => {
    const stopRouteTags = [
      '12|1234',
      '14|5565',
    ];
    const prediciton1 = {
      _routeTag: '14',
      _stopTag: '5565',
    };
    const prediciton2 = {
      _routeTag: '12',
      _stopTag: '1234',
    };
    expect(sortPredictions(
      stopRouteTags,
      [
        prediciton1,
        prediciton2,
      ],
    )).toEqual([
      prediciton2,
      prediciton1,
    ]);
  });
});

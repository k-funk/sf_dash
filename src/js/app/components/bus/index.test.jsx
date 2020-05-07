import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_PREDICTION } from 'sample_data/nextbus';
import LocalStorage from 'app/utils/local_storage';
import NextBus from 'app/integrations/nextbus';

import Bus, { CALL_INTERVAL, sortPredictions } from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let getPredictionsSpy;
  let prediction;
  let routeStopTags;

  beforeEach(() => {
    jest.spyOn(LocalStorage, 'get').mockReturnValue([]);
    prediction = { ...SAMPLE_PREDICTION };
    routeStopTags = [NextBus.getRouteStopTag(prediction._routeTag, prediction._stopTag)];
  });

  test('(default)', () => {
    wrapper = shallow((
      <Bus />
    ));
  });

  test('state contains prediction data', () => {
    jest.spyOn(LocalStorage, 'get').mockReturnValue(routeStopTags);
    getPredictionsSpy = jest.spyOn(NextBus, 'getPredictions')
      .mockImplementation(() => Promise.resolve(
        { body: { predictions: [prediction] } },
      ));

    // updateBusPredictions() gets called on componentDidMount
    wrapper = shallow((
      <Bus />
    ));

    expect(getPredictionsSpy).toHaveBeenCalledWith(routeStopTags);
  });

  test('has an errMsg', async () => {
    const errMsg = 'For agency=sf-muni route r=67 is not currently available.';

    jest.spyOn(LocalStorage, 'get').mockReturnValue(routeStopTags);
    getPredictionsSpy = jest.spyOn(NextBus, 'getPredictions')
      .mockImplementation(() => Promise.reject(new Error(errMsg)));

    // updateBusPredictions() gets called on componentDidMount
    wrapper = shallow((
      <Bus />
    ));

    expect(getPredictionsSpy).toHaveBeenCalledWith(routeStopTags);
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
    wrapper = shallow((
      <Bus />
    ));
    instance = wrapper.instance();
    updateBusPredictionsSpy = jest.spyOn(instance, 'updateBusPredictions')
      .mockImplementation(() => Promise.resolve());
  });

  test('componentDidMount sets an interval', () => {
    instance.componentDidMount();

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
      const routeStopTags = [NextBus.getRouteStopTag(prediction._routeTag, prediction._stopTag)];
      const errMsg = 'oh noes!';
      updateBusPredictionsSpy.mockRestore(); // it is mocked above
      jest.spyOn(LocalStorage, 'get').mockReturnValue(routeStopTags);
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
    const routeStopTags = [
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
      routeStopTags,
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

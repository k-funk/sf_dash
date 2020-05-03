import React from 'react';
import { shallow, mount } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import moment from 'moment';

import { SAMPLE_PREDICTION } from 'sample_data/nextbus';

import Bus, { CALL_INTERVAL } from './index';


// FIXME: update these after refactor
describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      showBusRemove: false,
      showBusAddStopForm: false,
      lastUpdated: moment(),
      msUntilWarning: 10000,
      removeStopRoute: () => {},
      toggleShowBusRemove: () => {},
      addForm: {
        toggleBusAddStopForm: () => {},
        loading: false,
        errMsg: '',
        validate: () => {},
        getNearbyStops: () => {},
        addStop: () => {},
        nearbyStops: [
          {
            tag: 'FIXME',
            stopTag: 'FIXME',
            title: 'FIXME',
            directionTitle: 'FIXME',
            stopTitle: 'FIXME',
          },
        ],
      },
    };
  });

  test('there are no predictions', () => {
    wrapper = shallow((
      <Bus {...defaultProps} predictions={[]} />
    ));
  });

  test('there is at least one prediction in the array', () => {
    wrapper = shallow((
      <Bus {...defaultProps} predictions={[{ ...SAMPLE_PREDICTION }]} />
    ));
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
      .mockImplementation(() => Promise.resolve);
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

  test('onAddOrRemoveStop', () => {
    instance.onAddOrRemoveStop();

    expect(clearIntervalSpy).toHaveBeenCalledWith(11);
    expect(updateBusPredictionsSpy).toHaveBeenCalledWith();
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), CALL_INTERVAL);
    expect(instance.interval).toEqual(11);
  });
});

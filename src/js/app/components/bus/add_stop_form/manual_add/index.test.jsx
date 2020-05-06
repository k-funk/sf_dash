import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import NextBus from 'app/integrations/nextbus';

import LocalStorage from 'app/utils/local_storage';
import ManualAdd from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let deafultProps;

  beforeEach(() => {
    deafultProps = {
      onAddOrRemoveStop: () => {},
    };
  });

  test('(default)', () => {
    wrapper = shallow((
      <ManualAdd {...deafultProps} />
    ));
  });

  test('stop added was invalid', () => {
    wrapper = shallow((
      <ManualAdd {...deafultProps} />
    ));
    wrapper.setState({
      stopIsValid: false,
    });
  });

  test('stop added was valid', () => {
    wrapper = shallow((
      <ManualAdd {...deafultProps} />
    ));
    wrapper.setState({
      stopIsValid: true,
    });
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('instance methods', () => {
  let wrapper;
  let instance;
  let onAddOrRemoveStopSpy;

  beforeEach(() => {
    onAddOrRemoveStopSpy = jest.fn();
  });

  beforeEach(() => {
    wrapper = shallow((
      <ManualAdd onAddOrRemoveStop={onAddOrRemoveStopSpy} />
    ));
    instance = wrapper.instance();
  });

  test('onChange', () => {
    const value = 'testVal';
    const field = 'routeTag';

    expect(wrapper.state()[field]).toEqual('');

    instance.onChange({ target: { value } }, field);

    expect(wrapper.state()[field]).toEqual(value);
  });

  describe('validateAndAddStop', () => {
    beforeEach(() => {
      wrapper.setState({
        routeTag: '14',
        stopTag: '5565',
      });
    });

    test('isValidStop returns true', async () => {
      const isValidStopSpy = jest.spyOn(NextBus, 'isValidStop').mockReturnValue(true);
      const addBusStopToLocalStorageSpy = jest.spyOn(LocalStorage, 'addBusStopToLocalStorage');

      await instance.validateAndAddStop({ preventDefault: () => {} });

      expect(isValidStopSpy).toHaveBeenCalledWith('14|5565');
      expect(wrapper.state().stopIsValid).toEqual(true);
      expect(addBusStopToLocalStorageSpy).toHaveBeenCalledWith('14|5565');
      expect(onAddOrRemoveStopSpy).toHaveBeenCalledWith();
    });

    test('isValidStop returns false', async () => {
      const isValidStopSpy = jest.spyOn(NextBus, 'isValidStop').mockReturnValue(false);

      await instance.validateAndAddStop({ preventDefault: () => {} });

      expect(isValidStopSpy).toHaveBeenCalledWith('14|5565');
      expect(wrapper.state().stopIsValid).toEqual(false);
    });
  });

  test('button clicks call onChange', () => {
    const spy = jest.spyOn(instance, 'onChange');
    const event = { target: { value: 'typing' } };

    wrapper.find('Input').at(0).simulate('change', event);
    expect(spy).toHaveBeenCalledWith(event, 'routeTag');

    wrapper.find('Input').at(1).simulate('change', event);
    expect(spy).toHaveBeenCalledWith(event, 'stopTag');
  });
});

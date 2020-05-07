import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import LocalStorage from 'app/utils/local_storage';
import NextBus from 'app/integrations/nextbus';

import RouteStopRemoval from './index';


describe('outputs the expected tree when localstorage contains', () => {
  let wrapper;

  test('routeStopTags', () => {
    jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage').mockReturnValue(['14|1234']);
    wrapper = shallow((
      <RouteStopRemoval onAddOrRemoveStop={() => {}} />
    ));
  });

  test('no routeStopTags', () => {
    jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage').mockReturnValue([]);
    wrapper = shallow((
      <RouteStopRemoval onAddOrRemoveStop={() => {}} />
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
    routeTag = '14';
    stopTag = '1234';
    jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage')
      .mockReturnValue([NextBus.getRouteStopTag(routeTag, stopTag)]);
    onAddOrRemoveStopSpy = jest.fn();
    wrapper = shallow((
      <RouteStopRemoval onAddOrRemoveStop={onAddOrRemoveStopSpy} />
    ));
    instance = wrapper.instance();
  });

  test('removeStop', () => {
    const removeBusStopFromLocalStorageSpy = jest.spyOn(LocalStorage, 'removeBusStopFromLocalStorage');
    const forceUpdateSpy = jest.spyOn(instance, 'forceUpdate');

    instance.removeStop(routeTag, stopTag);

    expect(removeBusStopFromLocalStorageSpy).toHaveBeenCalledWith(`${routeTag}|${stopTag}`);
    expect(onAddOrRemoveStopSpy).toHaveBeenCalledWith();
    expect(forceUpdateSpy).toHaveBeenCalledWith();
  });


  test('button clicks call removeStop', () => {
    const spy = jest.spyOn(instance, 'removeStop');
    wrapper.update();

    wrapper.find('Button').simulate('click');
    expect(spy).toHaveBeenCalledWith(routeTag, stopTag);
  });
});

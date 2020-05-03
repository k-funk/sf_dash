import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import NextBus from 'app/integrations/nextbus';
import LocalStorage from 'app/utils/local_storage';

import GeolocateAdd from './index';


const SAMPLE_NEARBY_STOPS = [
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Outbound',
    directionTitle: 'Outbound to Palou + Third Street',
    latLng: {
      lat: 37.7393099, lng: -122.4187199,
    },
    stopId: '14146',
    stopTag: '4146',
    stopTitle: 'Cortland Ave & Bocana St',
  }, {
    tag: '24', title: '24-Divisadero', directionName: 'Outbound', directionTitle: 'Outbound to Palou + Third Street', latLng: { lat: 37.73904, lng: -122.41658 }, stopId: '14143', stopTag: '4143', stopTitle: 'Cortland Ave & Andover St',
  },
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Outbound',
    directionTitle: 'Outbound to Palou + Third Street',
    latLng: {
      lat: 37.73883, lng: -122.41461,
    },
    stopId: '14152',
    stopTag: '4152',
    stopTitle: 'Cortland Ave & Ellsworth St',
  },
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Outbound',
    directionTitle: 'Outbound to Palou + Third Street',
    latLng: {
      lat: 37.73892, lng: -122.4134299,
    },
    stopId: '14154',
    stopTag: '4154',
    stopTitle: 'Cortland Ave & Folsom St',
  },
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Outbound',
    directionTitle: 'Outbound to Palou + Third Street',
    latLng: {
      lat: 37.73957, lng: -122.4121099,
    },
    stopId: '14159',
    stopTag: '4159',
    stopTitle: 'Cortland Ave & Prentiss St',
  },
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Inbound',
    directionTitle: 'Inbound to Jackson + Fillmore',
    latLng: {
      lat: 37.73978, lng: -122.4119899,
    },
    stopId: '14158',
    stopTag: '4158',
    stopTitle: 'Cortland Ave & Prentiss St',
  },
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Inbound',
    directionTitle: 'Inbound to Jackson + Fillmore',
    latLng: {
      lat: 37.7389999, lng: -122.41366,
    },
    stopId: '14153',
    stopTag: '4153',
    stopTitle: 'Cortland Ave & Folsom St',
  },
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Inbound',
    directionTitle: 'Inbound to Jackson + Fillmore',
    latLng: {
      lat: 37.7389199, lng: -122.41455,
    },
    stopId: '14151',
    stopTag: '4151',
    stopTitle: 'Cortland Ave & Ellsworth St',
  },
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Inbound',
    directionTitle: 'Inbound to Jackson + Fillmore',
    latLng: {
      lat: 37.73909, lng: -122.41639,
    },
    stopId: '14142',
    stopTag: '4142',
    stopTitle: 'Cortland Ave & Andover St',
  },
  {
    tag: '24',
    title: '24-Divisadero',
    directionName: 'Inbound',
    directionTitle: 'Inbound to Jackson + Fillmore',
    latLng: {
      lat: 37.7392999, lng: -122.41846,
    },
    stopId: '14145',
    stopTag: '4145',
    stopTitle: 'Cortland Ave & Bocana St',
  },
];

describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      onAddOrRemoveStop: () => {},
    };
  });

  test('(default)', () => {
    wrapper = shallow((
      <GeolocateAdd {...defaultProps} />
    ));
  });

  test('loader is shown', () => {
    wrapper = shallow((
      <GeolocateAdd {...defaultProps} />
    ));
    wrapper.setState({ loading: true });
  });

  test('errMsg is shown', () => {
    wrapper = shallow((
      <GeolocateAdd {...defaultProps} />
    ));
    wrapper.setState({ errMsg: 'oh noes!' });
  });

  test('nearbyStops is present', () => {
    wrapper = shallow((
      <GeolocateAdd {...defaultProps} />
    ));
    wrapper.setState({ nearbyStops: [...SAMPLE_NEARBY_STOPS] });
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
      <GeolocateAdd onAddOrRemoveStop={onAddOrRemoveStopSpy} />
    ));
    instance = wrapper.instance();
  });

  describe('getNearbyStops', () => {
    test('no meters are passed', async () => {
      const value = '';

      await instance.getNearbyStops({ target: { value } });

      expect(wrapper.state()).toMatchObject({
        loading: false,
      });
      // expect(wrapper.state().nearbyStops).toEqual([]);
      // expect(wrapper.state().loading).toEqual(false);
    });
    test('NextBus.getStopsNearMe succeeds', async () => {
      const value = '300';
      const nearbyStops = [...SAMPLE_NEARBY_STOPS];
      const getStopsNearMeSpy = jest.spyOn(NextBus, 'getStopsNearMe')
        .mockImplementation(() => Promise.resolve(nearbyStops));

      await instance.getNearbyStops({ target: { value } });

      expect(getStopsNearMeSpy).toHaveBeenCalledWith(value);
      expect(wrapper.state()).toMatchObject({
        nearbyStops,
        loading: false,
      });
    });

    test('NextBus.getStopsNearMe fails', async () => {
      const value = '300';
      const errMsg = 'oh noes!';
      const getStopsNearMeSpy = jest.spyOn(NextBus, 'getStopsNearMe')
        .mockImplementation(() => Promise.reject(new Error(errMsg)));

      await instance.getNearbyStops({ target: { value } });

      expect(getStopsNearMeSpy).toHaveBeenCalledWith(value);
      expect(wrapper.state()).toMatchObject({
        loading: false,
        errMsg,
      });
    });
  });

  test('addStop', () => {
    const routeStopTag = '12|1234';
    const addBusStopToLocalStorageSpy = jest.spyOn(LocalStorage, 'addBusStopToLocalStorage');

    instance.addStop(routeStopTag);

    expect(addBusStopToLocalStorageSpy).toHaveBeenCalledWith(routeStopTag);
    expect(onAddOrRemoveStopSpy).toHaveBeenCalledWith();
  });

  test('tr clicks call addStop', () => {
    wrapper.setState({ nearbyStops: [...SAMPLE_NEARBY_STOPS] });
    const spy = jest.spyOn(instance, 'addStop');

    wrapper.find('tbody tr').at(0).simulate('click');
    expect(spy).toHaveBeenCalledWith('24|4146');
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import GeolocateAdd from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    const addForm = {
      getNearbyStops: () => {},
      addStop: () => {},
      loading: false,
      errMsg: '',
      nearbyStops: [
        {
          tag: 'FIXME',
          stopTag: 'FIXME',
          title: 'FIXME',
          directionTitle: 'FIXME',
          stopTitle: 'FIXME',
        },
      ],
    };
    wrapper = shallow((
      <GeolocateAdd addForm={addForm} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

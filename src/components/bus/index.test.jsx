import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import moment from 'moment';

import { SAMPLE_PREDICTION } from '../../sample_data/nextbus';
import Bus from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      showBusRemoval: false,
      showBusAddStopForm: false,
      lastUpdated: moment(),
      msUntilWarning: 10000,
      removeStopRoute: () => {},
      toggleBusRemove: () => {},
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

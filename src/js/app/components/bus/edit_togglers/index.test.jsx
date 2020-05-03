import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_PREDICTION } from 'sample_data/nextbus';

import EditTogglers from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      showBusRemove: false,
      toggleShowBusRemove: () => {},
      predictions: [{ ...SAMPLE_PREDICTION }],
      toggleAddStopForm: () => {},
    };
  });

  test('both buttons are shown', () => {
    wrapper = shallow((
      <EditTogglers
        {...defaultProps}
        showBusRemove={false}
      />
    ));
  });

  test('only the add button is shown', () => {
    wrapper = shallow((
      <EditTogglers
        {...defaultProps}
        predictions={[]}
        showBusRemove={false}
      />
    ));
  });

  test('only the edit button is shown', () => {
    wrapper = shallow((
      <EditTogglers
        {...defaultProps}
        showBusRemove
      />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

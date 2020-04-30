import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import { SAMPLE_PREDICTION } from '../../../sample_data/nextbus';
import EditTogglers from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      addForm: {
        toggleBusAddStopForm: () => {},
      },
      toggleBusRemove: () => {},
    };
  });

  test('both buttons are shown', () => {
    wrapper = shallow((
      <EditTogglers
        {...defaultProps}
        showBusRemoval={false}
        predictions={[{ ...SAMPLE_PREDICTION }]}
      />
    ));
  });

  test('only the add button is shown', () => {
    wrapper = shallow((
      <EditTogglers
        {...defaultProps}
        showBusRemoval={false}
      />
    ));
  });

  test('only the edit button is shown', () => {
    wrapper = shallow((
      <EditTogglers
        {...defaultProps}
        showBusRemoval
        predictions={[{ ...SAMPLE_PREDICTION }]}
      />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

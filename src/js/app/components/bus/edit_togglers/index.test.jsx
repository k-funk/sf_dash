import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import LocalStorage from 'app/utils/local_storage';

import EditTogglers from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      showBusRemove: false,
      toggleShowBusRemove: () => {},
      toggleAddStopForm: () => {},
    };
  });

  test('both buttons are shown', () => {
    jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage')
      .mockReturnValue(['14|1234']);
    wrapper = shallow((
      <EditTogglers
        {...defaultProps}
        showBusRemove={false}
      />
    ));
  });

  test('only the add button is shown', () => {
    jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage')
      .mockReturnValue([]);
    wrapper = shallow((
      <EditTogglers
        {...defaultProps}
        predictions={[]}
        showBusRemove={false}
      />
    ));
  });

  test('only the edit button is shown', () => {
    jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage')
      .mockReturnValue(['14|1234']);
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

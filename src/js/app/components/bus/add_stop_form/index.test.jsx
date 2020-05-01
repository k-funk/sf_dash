import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import AddStopForm from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    const addForm = {
      toggleBusAddStopForm: () => {},
      validate: () => {},
      getNearbyStops: () => {},
      addStop: () => {},
    };
    wrapper = shallow((
      <AddStopForm addForm={addForm} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

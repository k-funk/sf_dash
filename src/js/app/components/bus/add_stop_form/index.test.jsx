import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import AddStopForm from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default)', () => {
    wrapper = shallow((
      <AddStopForm
        toggleAddStopForm={() => {}}
        onAddOrRemoveStop={() => {}}
      />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

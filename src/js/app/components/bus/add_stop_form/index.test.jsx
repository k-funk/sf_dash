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

  test('toggle tab2', () => {
    wrapper = shallow((
      <AddStopForm
        toggleAddStopForm={() => {}}
        onAddOrRemoveStop={() => {}}
      />
    ));
    wrapper.instance().toggle('2');
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('instance methods', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow((
      <AddStopForm
        toggleAddStopForm={() => {}}
        onAddOrRemoveStop={() => {}}
      />
    ));
    instance = wrapper.instance();
  });

  test('button clicks call toggle', () => {
    const spy = jest.spyOn(instance, 'toggle');

    wrapper.find('NavLink').at(0).simulate('click');
    expect(spy).toHaveBeenCalledWith('1');

    wrapper.find('NavLink').at(1).simulate('click');
    expect(spy).toHaveBeenCalledWith('2');
  });
});

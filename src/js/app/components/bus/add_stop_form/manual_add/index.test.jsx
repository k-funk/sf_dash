import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import ManualAdd from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let deafultProps;

  beforeEach(() => {
    deafultProps = {
      onAddOrRemoveStop: () => {},
    };
  });

  test('(default)', () => {
    wrapper = shallow((
      <ManualAdd {...deafultProps} />
    ));
  });

  test('stop added was invalid', () => {
    wrapper = shallow((
      <ManualAdd {...deafultProps} />
    ));
    wrapper.setState({
      stopIsValid: false,
    });
  });

  test('stop added was valid', () => {
    wrapper = shallow((
      <ManualAdd {...deafultProps} />
    ));
    wrapper.setState({
      stopIsValid: true,
    });
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
      <ManualAdd onAddOrRemoveStop={onAddOrRemoveStopSpy} />
    ));
    instance = wrapper.instance();
  });

  test('onChange', () => {
    const value = 'testVal';
    const field = 'routeTag';

    expect(wrapper.state()[field]).toEqual('');

    instance.onChange({ target: { value } }, field);

    expect(wrapper.state()[field]).toEqual(value);
  });

  // FIXME: simulate typing in Input
  // test('button clicks call onChange', () => {
  //   const spy = jest.spyOn(instance, 'onChange');
  //
  //   wrapper.find('Button').at(0).simulate('click');
  //   expect(spy).toHaveBeenCalledWith('dark-mode');
  //
  //   wrapper.find('Button').at(1).simulate('click');
  //   expect(spy).toHaveBeenCalledWith('light-mode');
  // });
});

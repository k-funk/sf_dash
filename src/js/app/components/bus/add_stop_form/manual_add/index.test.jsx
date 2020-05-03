import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import ManualAdd from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let onAddOrRemoveStopSpy;

  beforeEach(() => {
    onAddOrRemoveStopSpy = jest.fn();
  });

  test('(default)', () => {
    wrapper = shallow((
      <ManualAdd onAddOrRemoveStop={onAddOrRemoveStopSpy} />
    ));
  });

  test('stop added was invalid', () => {
    wrapper = shallow((
      <ManualAdd onAddOrRemoveStop={onAddOrRemoveStopSpy} />
    ));
    wrapper.setState({
      stopIsValid: false,
    });
  });

  test('stop added was valid', () => {
    wrapper = shallow((
      <ManualAdd onAddOrRemoveStop={onAddOrRemoveStopSpy} />
    ));
    wrapper.setState({
      stopIsValid: true,
    });
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

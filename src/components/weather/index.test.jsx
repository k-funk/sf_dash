import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import DarkSky from '../../integrations/darksky';
import { SAMPLE_LOCATION } from '../../sample_data/darksky';
import * as LocalStorageUtils from '../../utils/local_storage';
import Weather, { LOCATIONS } from './index';


describe('outputs the expected tree when', () => {
  let wrapper;
  let fetchAllLocationsWeatherDataSpy;

  beforeEach(() => {
    jest.spyOn(LocalStorageUtils, 'getLocalStorage').mockReturnValue('foo');
    fetchAllLocationsWeatherDataSpy = jest.spyOn(DarkSky, 'fetchAllLocationsWeatherData')
      .mockReturnValue([]);
  });

  test('it initially loads', () => {
    wrapper = shallow((
      <Weather />
    ));
  });

  test('there are errors', () => {
    wrapper = shallow((
      <Weather />
    ));

    wrapper.setState({
      fetchError: true,
    });
  });

  test('there is at least one location in the array', async () => {
    fetchAllLocationsWeatherDataSpy = jest.spyOn(DarkSky, 'fetchAllLocationsWeatherData')
      .mockReturnValue([{ data: { ...SAMPLE_LOCATION } }]);

    // updateWeatherLocations() gets called on componentDidMount
    wrapper = shallow((
      <Weather />
    ));

    expect(fetchAllLocationsWeatherDataSpy).toHaveBeenCalledWith(LOCATIONS, 'foo', 'foo');
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

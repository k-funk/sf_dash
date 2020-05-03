import { SAMPLE_PREDICTIONS_XML } from 'sample_data/nextbus';

import NextBus from './index';


test('xml parsing', () => {
  expect(NextBus.parsePredictionsXMLResponse(SAMPLE_PREDICTIONS_XML)).toMatchSnapshot();
});

test('getRouteStopTag', () => {
  expect(NextBus.getRouteStopTag('12', '5837')).toEqual('12|5837');
});

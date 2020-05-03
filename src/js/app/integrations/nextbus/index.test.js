import { SAMPLE_PREDICTIONS_XML, SAMPLE_ROUTE_CONFIG_XML } from 'sample_data/nextbus';

import NextBus from './index';


test('mergeRouteData', () => {
  const routeConfig = NextBus.parseRouteConfigXMLResponse(SAMPLE_ROUTE_CONFIG_XML);
  expect(NextBus.mergeRouteData(routeConfig.body.route)).toMatchSnapshot();
});

describe('xml parsing', () => {
  test('parsePredictionsXMLResponse', () => {
    expect(NextBus.parsePredictionsXMLResponse(SAMPLE_PREDICTIONS_XML)).toMatchSnapshot();
  });
  test('parseRouteConfigXMLResponse', () => {
    expect(NextBus.parseRouteConfigXMLResponse(SAMPLE_ROUTE_CONFIG_XML)).toMatchSnapshot();
  });
});

test('getRouteStopTag', () => {
  expect(NextBus.getRouteStopTag('12', '5837')).toEqual('12|5837');
});

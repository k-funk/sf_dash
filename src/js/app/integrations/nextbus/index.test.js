import {
  SAMPLE_PREDICTIONS_SUCCESS_XML,
  SAMPLE_PREDICTIONS_ERROR_XML,
  SAMPLE_ROUTE_CONFIG_SUCCESS_XML,
  SAMPLE_ROUTE_CONFIG_ERROR_XML,
} from 'sample_data/nextbus';

import NextBus, { URL, getUserPosition } from './index';


const SAMPLE_ROUTE_STOP_TAG = '14|1234';

describe('getUserPosition', () => {
  test('succeeds', async () => {
    const location = { coords: { latitude: 38, longitude: -122 } };
    jest.spyOn(global.navigator.geolocation, 'getCurrentPosition')
      .mockImplementation(resolve => resolve(location));

    const userPosition = await getUserPosition();

    expect(userPosition).toEqual(location);
  });

  test('fails', async () => {
    jest.spyOn(global.navigator.geolocation, 'getCurrentPosition')
      .mockImplementation((resolve, reject) => reject(new Error()));

    await expect(getUserPosition()).rejects.toThrow('');
  });
});

describe('getPredictions', () => {
  test('succeeds', async () => {
    axiosMock.onGet(URL).reply(200, SAMPLE_PREDICTIONS_SUCCESS_XML);

    const predictions = await NextBus.getPredictions([SAMPLE_ROUTE_STOP_TAG]);

    expect(predictions).toMatchSnapshot();
  });

  test('xml body has an <Error /> element', async () => {
    axiosMock.onGet(URL).reply(200, SAMPLE_PREDICTIONS_ERROR_XML);

    await expect(NextBus.getPredictions([SAMPLE_ROUTE_STOP_TAG]))
      .rejects.toThrow('Agency parameter "a=sf-muniz" is not valid.');
  });

  test('the response caused a rejection non-200', async () => {
    axiosMock.onGet(URL).reply(400, {});

    await expect(NextBus.getPredictions([SAMPLE_ROUTE_STOP_TAG]))
      .rejects.toThrow('Request failed with status code 400');
  });
});

describe('getRouteConfig', () => {
  test('succeeds', async () => {
    axiosMock.onGet(URL).reply(200, SAMPLE_ROUTE_CONFIG_SUCCESS_XML);

    const predictions = await NextBus.getRouteConfig();

    expect(predictions).toMatchSnapshot();
  });

  test('xml body has an <Error /> element', async () => {
    axiosMock.onGet(URL).reply(200, SAMPLE_ROUTE_CONFIG_ERROR_XML);

    await expect(NextBus.getRouteConfig())
      .rejects.toThrow('Agency parameter "a=sf-muniz" is not valid.');
  });

  test('the response caused a rejection non-200', async () => {
    axiosMock.onGet(URL).reply(400, {});

    await expect(NextBus.getRouteConfig())
      .rejects.toThrow('Request failed with status code 400');
  });
});

test('mergeRouteData', () => {
  const routeConfig = NextBus.parseRouteConfigXMLResponse(SAMPLE_ROUTE_CONFIG_SUCCESS_XML);
  expect(NextBus.mergeRouteData(routeConfig.body.route)).toMatchSnapshot();
});

describe('isValidStop', () => {
  test('success', async () => {
    const predictions = {};
    jest.spyOn(NextBus, 'getPredictions')
      .mockImplementation(() => Promise.resolve({ body: { predictions } }));

    const isValidStop = await NextBus.isValidStop(SAMPLE_ROUTE_STOP_TAG);

    expect(isValidStop).toEqual(true);
  });

  test('failure', async () => {
    jest.spyOn(NextBus, 'getPredictions')
      .mockImplementation(() => Promise.reject());

    const isValidStop = await NextBus.isValidStop(SAMPLE_ROUTE_STOP_TAG);

    expect(isValidStop).toEqual(false);
  });
});

describe('xml parsing', () => {
  test('parsePredictionsXMLResponse', () => {
    expect(NextBus.parsePredictionsXMLResponse(SAMPLE_PREDICTIONS_SUCCESS_XML)).toMatchSnapshot();
  });
  test('parseRouteConfigXMLResponse', () => {
    expect(NextBus.parseRouteConfigXMLResponse(SAMPLE_ROUTE_CONFIG_SUCCESS_XML)).toMatchSnapshot();
  });
});

test('getRouteStopTag', () => {
  expect(NextBus.getRouteStopTag('12', '5837')).toEqual('12|5837');
});

test('splitRouteStopTag', () => {
  expect(NextBus.splitRouteStopTag('14|1234')).toEqual(['14', '1234']);
});

import LocalStorage, { WEATHER_KEY_KEY, BUS_ROUTE_STOP_TAGS_KEY } from './index';


test('get', () => {
  const spy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue('["test"]');

  expect(LocalStorage.get(WEATHER_KEY_KEY)).toEqual(['test']);
  expect(spy).toHaveBeenCalledWith(WEATHER_KEY_KEY);
});

test('set', () => {
  const spy = jest.spyOn(window.localStorage, 'setItem');

  LocalStorage.set(WEATHER_KEY_KEY, ['test']);

  expect(spy).toHaveBeenCalledWith(WEATHER_KEY_KEY, '["test"]');
});

test('setSampleData', () => {
  const localStorageSetSpy = jest.spyOn(LocalStorage, 'set');

  LocalStorage.setSampleData(BUS_ROUTE_STOP_TAGS_KEY);

  expect(localStorageSetSpy)
    .toHaveBeenCalledWith('routeStopTags', ['14|5565', '67|6208', '27|3930', '12|7552']);
});

test('dump', () => {
  window.localStorage.setItem(WEATHER_KEY_KEY, 'test');
  const spy = jest.spyOn(window.localStorage, 'removeItem');

  LocalStorage.dump();

  expect(spy).toHaveBeenCalledWith(WEATHER_KEY_KEY);
});

describe('getBusStopsFromLocalStorage returns', () => {
  let getLocalStorageSpy;

  test('an empty array', () => {
    getLocalStorageSpy = jest.spyOn(LocalStorage, 'get').mockReturnValue(null);

    expect(LocalStorage.getBusStopsFromLocalStorage()).toEqual([]);
  });

  test('the data from local storage', () => {
    const arr = ['12|1234'];
    getLocalStorageSpy = jest.spyOn(LocalStorage, 'get').mockReturnValue(arr);

    expect(LocalStorage.getBusStopsFromLocalStorage()).toEqual(['12|1234']);
  });

  afterEach(() => {
    expect(getLocalStorageSpy).toHaveBeenCalledWith(BUS_ROUTE_STOP_TAGS_KEY);
  });
});

test('addBusStopToLocalStorage', () => {
  const routeStopTag = '12|1234';
  const duplicateRouteStopTag = '12|1111';
  const getBusStopsFromLocalStorageSpy = jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage')
    .mockReturnValue([routeStopTag]);
  const localStorageSetSpy = jest.spyOn(LocalStorage, 'set');

  LocalStorage.addBusStopToLocalStorage(duplicateRouteStopTag);

  expect(getBusStopsFromLocalStorageSpy).toHaveBeenCalledWith();
  expect(localStorageSetSpy).toHaveBeenCalledWith(
    BUS_ROUTE_STOP_TAGS_KEY,
    [routeStopTag, duplicateRouteStopTag],
  );
});

describe('removeBusStopFromLocalStorage when localstorage contains', () => {
  test('routeStopTags', () => {
    const routeStopTag1 = '12|1234';
    const routeStopTag2 = '14|4321';
    const getBusStopsFromLocalStorageSpy = jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage')
      .mockReturnValue([routeStopTag1, routeStopTag2]);
    const localStorageSetSpy = jest.spyOn(LocalStorage, 'set');

    LocalStorage.removeBusStopFromLocalStorage(routeStopTag1);

    expect(getBusStopsFromLocalStorageSpy).toHaveBeenCalledWith();
    expect(localStorageSetSpy).toHaveBeenCalledWith(
      BUS_ROUTE_STOP_TAGS_KEY,
      [routeStopTag2],
    );
  });

  test('no routeStopTags', () => {
    const routeStopTag = '12|1234';
    const getBusStopsFromLocalStorageSpy = jest.spyOn(LocalStorage, 'getBusStopsFromLocalStorage')
      .mockReturnValue([]);
    const localStorageSetSpy = jest.spyOn(LocalStorage, 'set');

    LocalStorage.removeBusStopFromLocalStorage(routeStopTag);

    expect(getBusStopsFromLocalStorageSpy).toHaveBeenCalledWith();
    expect(localStorageSetSpy).toHaveBeenCalledWith(
      BUS_ROUTE_STOP_TAGS_KEY,
      [],
    );
  });
});

afterEach(() => {
  window.localStorage.clear();
});

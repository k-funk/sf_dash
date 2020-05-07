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

test('addBusStopToLocalStorage', () => {
  const routeStopTag = '12|1234';
  const duplicateRouteStopTag = '12|1111';
  const localStorageGetSpy = jest.spyOn(LocalStorage, 'get')
    .mockReturnValue([routeStopTag]);
  const localStorageSetSpy = jest.spyOn(LocalStorage, 'set');

  LocalStorage.addBusStopToLocalStorage(duplicateRouteStopTag);

  expect(localStorageGetSpy).toHaveBeenCalledWith(BUS_ROUTE_STOP_TAGS_KEY);
  expect(localStorageSetSpy).toHaveBeenCalledWith(
    BUS_ROUTE_STOP_TAGS_KEY,
    [routeStopTag, duplicateRouteStopTag],
  );
});

test('removeBusStopFromLocalStorage', () => {
  const routeStopTag = '12|1234';
  const localStorageGetSpy = jest.spyOn(LocalStorage, 'get')
    .mockReturnValue([routeStopTag]);
  const localStorageSetSpy = jest.spyOn(LocalStorage, 'set');

  LocalStorage.removeBusStopFromLocalStorage(routeStopTag);

  expect(localStorageGetSpy).toHaveBeenCalledWith(BUS_ROUTE_STOP_TAGS_KEY);
  expect(localStorageSetSpy).toHaveBeenCalledWith(
    BUS_ROUTE_STOP_TAGS_KEY,
    [],
  );
});


afterEach(() => {
  window.localStorage.clear();
});

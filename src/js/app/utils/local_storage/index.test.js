import * as LocalStorageUtils from './index';


test('dumpLocalStorage', () => {
  window.localStorage.setItem(LocalStorageUtils.WEATHER_KEY_KEY, 'test');
  const spy = jest.spyOn(window.localStorage, 'removeItem');

  LocalStorageUtils.dumpLocalStorage();

  expect(spy).toHaveBeenCalledWith(LocalStorageUtils.WEATHER_KEY_KEY);
});

afterEach(() => {
  window.localStorage.clear();
});

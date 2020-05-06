import DarkSky from './index';


test('getUrl', () => {
  expect(DarkSky.getUrl({
    key: 'abc',
    lat: 38,
    long: -122,
    units: 'si',
  })).toEqual('https://api.darksky.net/forecast/abc/38,-122?exclude=minutely,flags,currently&lang=en&units=si');
});

test('convertUnitsForDarkSky', () => {
  expect(DarkSky.convertUnitsForDarkSky()).toEqual('auto');
  expect(DarkSky.convertUnitsForDarkSky('')).toEqual('auto');
  expect(DarkSky.convertUnitsForDarkSky('f')).toEqual('us');
  expect(DarkSky.convertUnitsForDarkSky('c')).toEqual('si');
  expect(() => DarkSky.convertUnitsForDarkSky('foo'))
    .toThrow('Invalid Unit type: foo');
});

import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { getLocalStorage, WEATHER_KEY_KEY, WEATHER_UNITS_KEY } from '../utils/local_storage';


export default class DarkSky {
  static getUrl = ({
    // all params required
    base = 'https://api.darksky.net/forecast',
    key,
    lat,
    long,
    exclude = 'minutely,flags,currently',
    lang = 'en',
    units = 'auto',
  }) => `${base}/${key}/${lat},${long}?exclude=${exclude}&lang=${lang}&units=${units}`;

  static fetchWeatherData = async ({ lat, long, key, units }) => {
    // NOTE: this is a jsonp call. there are no status codes or errors to parse like with XHR
    // try/catch errors in components that call this, so just return the response as-is
    const response = await axios({
      method: 'get',
      url: this.getUrl({ lat, long, key, units }),
      adapter: jsonpAdapter, // gets around CORS
    });
    return response;
  }

  static fetchAllLocationsWeatherData = async locations => {
    const key = getLocalStorage(WEATHER_KEY_KEY);
    const units = this.convertUnitsForDarkSky(getLocalStorage(WEATHER_UNITS_KEY));
    const responses = await axios.all(
      locations.map(({ lat, long }) => (
        this.fetchWeatherData({ lat, long, key, units })
      )),
    );
    return responses;
  }

  static isValidKey = async key => {
    const response = await this.fetchWeatherData({ lat: 38, long: -122, key });
    return !!response?.data;
  }

  static convertUnitsForDarkSky = (units = 'auto') => {
    switch (units) {
      case ('f'):
        return 'us';
      case ('c'):
        return 'si';
      case ('auto'):
        return 'auto';
      default:
        throw new Error(`Invalid Unit type: ${units}`);
    }
  };
}

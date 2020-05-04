import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';


export const URL_BASE = 'https://api.darksky.net/forecast';

export default class DarkSky {
  static getUrl = ({
    // all params required
    base = URL_BASE,
    key,
    lat,
    long,
    exclude = 'minutely,flags,currently',
    lang = 'en',
    units = 'auto',
  }) => `${base}/${key}/${lat},${long}?exclude=${exclude}&lang=${lang}&units=${units}`;

  static async fetchWeatherData({ lat, long, key, units }) {
    // NOTE: this is a jsonp call. there are no status codes or errors to parse like with XHR
    // try/catch errors in components that call this, so just return the response as-is
    const response = await axios.get(this.getUrl({ lat, long, key, units }), {
      adapter: jsonpAdapter, // gets around CORS
    });
    return response;
  }

  static async fetchAllLocationsWeatherData(locations, key, units) {
    const darkSkyUnits = this.convertUnitsForDarkSky(units);
    const responses = await axios.all(
      locations.map(({ lat, long }) => (
        this.fetchWeatherData({ lat, long, key, units: darkSkyUnits })
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

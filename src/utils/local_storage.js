export const ANGULAR_LOCAL_STORAGE_PREFIX = 'ngStorage-';
export const WEATHER_KEY_KEY = 'weatherKey';
export const WEATHER_UNITS_KEY = 'weatherUnits';
export const BUS_STOP_ROUTE_TAGS_KEY = 'stopRouteTags';
export const HTML_CLASS_KEY = 'htmlClass';
export const ALL_SETTINGS_KEYS = [
  WEATHER_KEY_KEY,
  WEATHER_UNITS_KEY,
  HTML_CLASS_KEY,
].reduce(
  // include legacy keys
  (fullArray, key) => ([...fullArray, key, `${ANGULAR_LOCAL_STORAGE_PREFIX}${key}`]),
  [],
);

export const getLocalStorage = key => (
  JSON.parse((
    window.localStorage.getItem(key) ||
    // legacy support
    window.localStorage.getItem(`${ANGULAR_LOCAL_STORAGE_PREFIX}${key}`)
  )) || ''
);

export const setLocalStorage = (key, val) => (
  window.localStorage.setItem(key, JSON.stringify(val))
);

export const dumpLocalStorage = () => {
  ALL_SETTINGS_KEYS.forEach(key => window.localStorage.removeItem(key));
};

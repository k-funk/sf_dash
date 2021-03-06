export const SAMPLE_HOURLY_FORECAST = {
  time: 1588276800,
  summary: 'Partly Cloudy',
  icon: 'partly-cloudy-day',
  precipIntensity: 0,
  precipProbability: 0.40, // this was hacked in for testing purposes
  temperature: 15.49,
  apparentTemperature: 15.49,
  dewPoint: 10.85,
  humidity: 0.74,
  pressure: 1019.9,
  windSpeed: 4.44,
  windGust: 5.76,
  windBearing: 263,
  cloudCover: 0.36,
  uvIndex: 7,
  visibility: 16.093,
  ozone: 319.6,
};

export const SAMPLE_DAILY_FORECAST = {
  time: 1588230000,
  summary: 'Partly cloudy throughout the day.',
  icon: 'partly-cloudy-day',
  sunriseTime: 1588252500,
  sunsetTime: 1588302060,
  moonPhase: 0.26,
  precipIntensity: 0.0089,
  precipIntensityMax: 0.031,
  precipIntensityMaxTime: 1588309200,
  precipProbability: 0.40, // this was hacked in for testing purposes
  precipType: 'rain',
  temperatureHigh: 16.23,
  temperatureHighTime: 1588285860,
  temperatureLow: 10.77,
  temperatureLowTime: 1588339020,
  apparentTemperatureHigh: 15.95,
  apparentTemperatureHighTime: 1588285860,
  apparentTemperatureLow: 11.04,
  apparentTemperatureLowTime: 1588339020,
  dewPoint: 8.85,
  humidity: 0.75,
  pressure: 1019.5,
  windSpeed: 4.22,
  windGust: 10.47,
  windGustTime: 1588295580,
  windBearing: 266,
  cloudCover: 0.41,
  uvIndex: 7,
  uvIndexTime: 1588278780,
  visibility: 16.093,
  ozone: 317.9,
  temperatureMin: 11.22,
  temperatureMinTime: 1588251120,
  temperatureMax: 16.23,
  temperatureMaxTime: 1588285860,
  apparentTemperatureMin: 11.49,
  apparentTemperatureMinTime: 1588251120,
  apparentTemperatureMax: 15.95,
  apparentTemperatureMaxTime: 1588285860,
};

export const SAMPLE_ALERT = {
  title: 'Flood Watch for Mason, WA',
  time: 1509993360,
  expires: 1510036680,
  description: '...FLOOD WATCH REMAINS IN EFFECT THROUGH LATE MONDAY NIGHT...\n',
  uri: 'http://alerts.weather.gov/cap/wwacapget.php?x=WA1255E4DB8494.FloodWatch.1255',
};


export const SAMPLE_LOCATION = {
  daily: {
    data: [
      { ...SAMPLE_DAILY_FORECAST },
      {
        time: 1588316400,
        summary: 'Clear throughout the day.',
        icon: 'clear-day',
        sunriseTime: 1588338840,
        sunsetTime: 1588388520,
        moonPhase: 0.3,
        precipIntensity: 0.0094,
        precipIntensityMax: 0.0454,
        precipIntensityMaxTime: 1588326900,
        precipProbability: 0.04,
        precipType: 'rain',
        temperatureHigh: 17.7,
        temperatureHighTime: 1588367220,
        temperatureLow: 12.58,
        temperatureLowTime: 1588430940,
        apparentTemperatureHigh: 17.42,
        apparentTemperatureHighTime: 1588367220,
        apparentTemperatureLow: 12.85,
        apparentTemperatureLowTime: 1588430940,
        dewPoint: 6.98,
        humidity: 0.63,
        pressure: 1019.5,
        windSpeed: 4.28,
        windGust: 9.14,
        windGustTime: 1588377660,
        windBearing: 276,
        cloudCover: 0.2,
        uvIndex: 8,
        uvIndexTime: 1588365360,
        visibility: 16.093,
        ozone: 343.3,
        temperatureMin: 10.77,
        temperatureMinTime: 1588339020,
        temperatureMax: 17.7,
        temperatureMaxTime: 1588367220,
        apparentTemperatureMin: 11.04,
        apparentTemperatureMinTime: 1588339020,
        apparentTemperatureMax: 17.42,
        apparentTemperatureMaxTime: 1588367220,
      },
      {
        time: 1588402800,
        summary: 'Overcast throughout the day.',
        icon: 'cloudy',
        sunriseTime: 1588425180,
        sunsetTime: 1588474920,
        moonPhase: 0.33,
        precipIntensity: 0.0188,
        precipIntensityMax: 0.0494,
        precipIntensityMaxTime: 1588418280,
        precipProbability: 0.1,
        precipType: 'rain',
        temperatureHigh: 16.18,
        temperatureHighTime: 1588458300,
        temperatureLow: 11.47,
        temperatureLowTime: 1588518000,
        apparentTemperatureHigh: 15.9,
        apparentTemperatureHighTime: 1588458300,
        apparentTemperatureLow: 11.74,
        apparentTemperatureLowTime: 1588518000,
        dewPoint: 10.11,
        humidity: 0.77,
        pressure: 1020.3,
        windSpeed: 3.38,
        windGust: 6.37,
        windGustTime: 1588463040,
        windBearing: 257,
        cloudCover: 0.87,
        uvIndex: 5,
        uvIndexTime: 1588452300,
        visibility: 15.997,
        ozone: 332.6,
        temperatureMin: 12.58,
        temperatureMinTime: 1588430940,
        temperatureMax: 16.18,
        temperatureMaxTime: 1588458300,
        apparentTemperatureMin: 12.85,
        apparentTemperatureMinTime: 1588430940,
        apparentTemperatureMax: 15.9,
        apparentTemperatureMaxTime: 1588458300,
      },
      {
        time: 1588489200,
        summary: 'Partly cloudy throughout the day.',
        icon: 'partly-cloudy-day',
        sunriseTime: 1588511520,
        sunsetTime: 1588561380,
        moonPhase: 0.37,
        precipIntensity: 0.0079,
        precipIntensityMax: 0.0203,
        precipIntensityMaxTime: 1588489200,
        precipProbability: 0.08,
        precipType: 'rain',
        temperatureHigh: 15.29,
        temperatureHighTime: 1588540440,
        temperatureLow: 10.28,
        temperatureLowTime: 1588593780,
        apparentTemperatureHigh: 15.01,
        apparentTemperatureHighTime: 1588540440,
        apparentTemperatureLow: 10.55,
        apparentTemperatureLowTime: 1588593780,
        dewPoint: 7.29,
        humidity: 0.68,
        pressure: 1021.5,
        windSpeed: 4.27,
        windGust: 11.61,
        windGustTime: 1588554480,
        windBearing: 273,
        cloudCover: 0.44,
        uvIndex: 8,
        uvIndexTime: 1588537860,
        visibility: 16.093,
        ozone: 327.1,
        temperatureMin: 11.43,
        temperatureMinTime: 1588519740,
        temperatureMax: 15.29,
        temperatureMaxTime: 1588540440,
        apparentTemperatureMin: 11.7,
        apparentTemperatureMinTime: 1588519740,
        apparentTemperatureMax: 15.01,
        apparentTemperatureMaxTime: 1588540440,
      },
      {
        time: 1588575600,
        summary: 'Clear throughout the day.',
        icon: 'clear-day',
        sunriseTime: 1588597860,
        sunsetTime: 1588647840,
        moonPhase: 0.41,
        precipIntensity: 0.0016,
        precipIntensityMax: 0.011,
        precipIntensityMaxTime: 1588647000,
        precipProbability: 0.01,
        precipType: 'rain',
        temperatureHigh: 18.18,
        temperatureHighTime: 1588633500,
        temperatureLow: 11.57,
        temperatureLowTime: 1588681860,
        apparentTemperatureHigh: 17.9,
        apparentTemperatureHighTime: 1588633500,
        apparentTemperatureLow: 11.84,
        apparentTemperatureLowTime: 1588681860,
        dewPoint: 6.4,
        humidity: 0.6,
        pressure: 1021.5,
        windSpeed: 3.33,
        windGust: 8.53,
        windGustTime: 1588638060,
        windBearing: 280,
        cloudCover: 0.01,
        uvIndex: 9,
        uvIndexTime: 1588622700,
        visibility: 16.093,
        ozone: 332.6,
        temperatureMin: 10.28,
        temperatureMinTime: 1588593780,
        temperatureMax: 18.18,
        temperatureMaxTime: 1588633500,
        apparentTemperatureMin: 10.55,
        apparentTemperatureMinTime: 1588593780,
        apparentTemperatureMax: 17.9,
        apparentTemperatureMaxTime: 1588633500,
      },
      {
        time: 1588662000,
        summary: 'Partly cloudy throughout the day.',
        icon: 'partly-cloudy-day',
        sunriseTime: 1588684200,
        sunsetTime: 1588734300,
        moonPhase: 0.45,
        precipIntensity: 0.0036,
        precipIntensityMax: 0.0072,
        precipIntensityMaxTime: 1588744800,
        precipProbability: 0.05,
        precipType: 'rain',
        temperatureHigh: 17.05,
        temperatureHighTime: 1588719120,
        temperatureLow: 12.25,
        temperatureLowTime: 1588767480,
        apparentTemperatureHigh: 16.77,
        apparentTemperatureHighTime: 1588719120,
        apparentTemperatureLow: 12.52,
        apparentTemperatureLowTime: 1588767480,
        dewPoint: 6.1,
        humidity: 0.58,
        pressure: 1021.6,
        windSpeed: 4.22,
        windGust: 10.83,
        windGustTime: 1588731060,
        windBearing: 292,
        cloudCover: 0.35,
        uvIndex: 5,
        uvIndexTime: 1588705380,
        visibility: 16.093,
        ozone: 329,
        temperatureMin: 11.57,
        temperatureMinTime: 1588681860,
        temperatureMax: 17.05,
        temperatureMaxTime: 1588719120,
        apparentTemperatureMin: 11.84,
        apparentTemperatureMinTime: 1588681860,
        apparentTemperatureMax: 16.77,
        apparentTemperatureMaxTime: 1588719120,
      },
    ],
  },
  hourly: {
    data: [
      { ...SAMPLE_HOURLY_FORECAST },
      {
        time: 1588280400,
        summary: 'Clear',
        icon: 'clear-day',
        precipIntensity: 0,
        precipProbability: 0,
        temperature: 15.71,
        apparentTemperature: 15.71,
        dewPoint: 10.41,
        humidity: 0.71,
        pressure: 1019.7,
        windSpeed: 5.04,
        windGust: 7.32,
        windBearing: 262,
        cloudCover: 0.29,
        uvIndex: 7,
        visibility: 16.093,
        ozone: 319.9,
      },
      {
        time: 1588284000,
        summary: 'Partly Cloudy',
        icon: 'partly-cloudy-day',
        precipIntensity: 0,
        precipProbability: 0,
        temperature: 15.91,
        apparentTemperature: 15.91,
        dewPoint: 9.74,
        humidity: 0.67,
        pressure: 1019.4,
        windSpeed: 5.61,
        windGust: 8.8,
        windBearing: 259,
        cloudCover: 0.35,
        uvIndex: 6,
        visibility: 16.093,
        ozone: 320,
      },
      {
        time: 1588287600,
        summary: 'Clear',
        icon: 'clear-day',
        precipIntensity: 0.0051,
        precipProbability: 0.01,
        precipType: 'rain',
        temperature: 15.87,
        apparentTemperature: 15.87,
        dewPoint: 8.7,
        humidity: 0.62,
        pressure: 1019.6,
        windSpeed: 6.2,
        windGust: 9.54,
        windBearing: 280,
        cloudCover: 0.27,
        uvIndex: 4,
        visibility: 16.093,
        ozone: 320,
      },
    ],
  },
  alerts: [
    { ...SAMPLE_ALERT },
  ],
};

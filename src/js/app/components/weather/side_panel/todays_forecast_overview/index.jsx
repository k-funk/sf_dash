import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';

import LocalStorage, { WEATHER_UNITS_KEY } from 'app/utils/local_storage';

import WeatherIcon from '../../icon';


export const cToF = celsius => ((celsius * 9) / 5) + 32;
export const fToC = fahrenheit => ((fahrenheit - 32) * 5) / 9;


export default class TodaysForecastOverview extends PureComponent {
  static propTypes = {
    className: T.string,
    todaysForecast: T.shape({
      icon: T.string,
      summary: T.string,
      temperatureMin: T.number,
      temperatureMax: T.number,
    }),
  };

  static defaultProps = {
    className: '',
    todaysForecast: {},
  }

  constructor(props) {
    super(props);
    this.weatherUnits = LocalStorage.get(WEATHER_UNITS_KEY);
  }

  getAltHighLow = () => {
    const { weatherUnits, props } = this;
    const { temperatureMin, temperatureMax } = props.todaysForecast;

    if (!weatherUnits) { return null; }

    const fn = weatherUnits === 'f' ? fToC : cToF;

    return (
      <div className="high-low-alt text-muted">
        {fn(temperatureMin).toFixed(0)}
        /
        {fn(temperatureMax).toFixed(0)}
        &deg;
        {weatherUnits === 'f' ? 'C' : 'F'}
      </div>
    );
  }

  render() {
    const { className, todaysForecast } = this.props;
    const { icon, summary, temperatureMin, temperatureMax } = todaysForecast;

    return (
      <div
        className={classNames(
          className, 'forecast', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center',
        )}
      >
        <WeatherIcon icon={icon} />
        <div className="text-truncate">
          <div className="conditions text-truncate">
            {summary}
          </div>

          <div className="high-low">
            {temperatureMin.toFixed(0)}
            <span className="text-muted px-1">/</span>
            {temperatureMax.toFixed(0)}
            &deg;
          </div>

          {this.getAltHighLow()}
        </div>
      </div>
    );
  }
}

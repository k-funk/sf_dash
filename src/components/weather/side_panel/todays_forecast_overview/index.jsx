import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';

import WeatherIcon from '../../icon';


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

          {/* TODO: add this feature back once I settle on a localStorage data-passing pattern */}
          {/* <div className="high-low-alt text-muted" ng-show="weather.weatherUnits"> */}
          {/*   <span ng-if="weather.weatherUnits === 'c'"> */}
          {/*     {temperatureMin | cToF | number:0 }/{temperatureMax | cToF | number:0 }&deg;F */}
          {/*   </span> */}
          {/*   <span ng-if="weather.weatherUnits === 'f'"> */}
          {/*     {temperatureMin | fToC | number:0 }/{temperatureMax | fToC | number:0 }&deg;C */}
          {/*   </span> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';

import TodaysRainForecast from './todays_rain_forecast';
import TodaysForecastOverview from './todays_forecast_overview';
import WeatherAlerts from './alerts';


export default class SidePanel extends PureComponent {
  static propTypes = {
    className: T.string,
    todaysForecast: T.object,
    hourlyForecasts: T.array,
    alerts: T.array,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, todaysForecast, hourlyForecasts, alerts } = this.props;

    return (
      <div className={classNames(className, 'side-panel px-3')}>
        <TodaysForecastOverview todaysForecast={todaysForecast} />
        <TodaysRainForecast hourlyForecasts={hourlyForecasts} />
        <WeatherAlerts alerts={alerts} />
      </div>
    );
  }
}

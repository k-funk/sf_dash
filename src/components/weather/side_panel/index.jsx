import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';

import TodaysRainForecast from './todays_rain_forecast';
import TodaysForecastOverview from './todays_forecast_overview';
import Alerts from './alerts';


export default class SidePanel extends PureComponent {
  static propTypes = {
    className: T.string,
    dailyForecasts: T.array,
    hourlyForecasts: T.array,
    alerts: T.array,
  };

  static defaultProps = {
    className: '',
    dailyForecasts: [],
    hourlyForecasts: [],
    alerts: [],
  }

  render() {
    const { className, dailyForecasts, hourlyForecasts, alerts } = this.props;

    return (
      <div className={classNames(className, 'side-panel px-3')}>
        <TodaysForecastOverview todaysForecast={dailyForecasts[0]} />
        <TodaysRainForecast hourlyForecasts={hourlyForecasts} />
        <Alerts alerts={alerts} />
      </div>
    );
  }
}

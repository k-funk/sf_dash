import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import { MIN_CHANCE_OF_RAIN } from 'app/constants';


export const PRECIP_HOUR_LIMIT = 23;

export default class TodaysRainForecast extends PureComponent {
  static propTypes = {
    className: T.string,
    hourlyForecasts: T.arrayOf(
      T.shape({
        precipProbability: T.number,
        time: T.number,
      }),
    ),
  };

  static defaultProps = {
    className: '',
    hourlyForecasts: [],
  }

  getFirstRainForecast = () => {
    const { hourlyForecasts } = this.props;
    return hourlyForecasts
      .slice(0, PRECIP_HOUR_LIMIT)
      .find(hourlyForecast => (
        hourlyForecast.precipProbability >= MIN_CHANCE_OF_RAIN
      )) || {};
  }

  render() {
    const { className } = this.props;
    const firstRainForecast = this.getFirstRainForecast();
    const { precipProbability, time } = firstRainForecast;

    return (
      <div className={classNames(className, 'rain-chance')}>
        { precipProbability ? (
          <>
            <div className="umbrella bring-umbrella" />
            <span className="pop text-info">
              {(precipProbability * 100).toFixed(0)}%
            </span>
            <sup className="at mx-1">@</sup>
            <span className="time">{moment(time * 1000).format('hA')}</span>
          </>
        ) : (
          <>
            <div className="umbrella no-umbrella" />
            <div className="no-rain">No rain in 24hr.</div>
          </>
        )}
        <div className="text-muted">
          Based on a {(MIN_CHANCE_OF_RAIN * 100).toFixed(0)}% chance threshold.
        </div>
      </div>
    );
  }
}

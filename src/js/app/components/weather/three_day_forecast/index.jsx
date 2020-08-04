import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Row, Col } from 'reactstrap';
import { format } from 'date-fns';
import classNames from 'classnames';

import WeatherIcon from '../icon';


export default class ThreeDayForecast extends PureComponent {
  static propTypes = {
    className: T.string,
    dailyForecasts: T.arrayOf(
      T.shape({
        icon: T.string,
        summary: T.string,
        temperatureMin: T.number,
        temperatureMax: T.number,
        time: T.number,
      }),
    ),
  };

  static defaultProps = {
    className: '',
    dailyForecasts: [],
  }

  render() {
    const { className, dailyForecasts } = this.props;

    return (
      <Row className={classNames(className, 'slim-gutters', 'forecasts')}>
        {/* gets indexes 1, 2, 3 of the array */}
        {dailyForecasts.slice(1, 4).map(dailyForecast => {
          const { summary, temperatureMin, temperatureMax, time, icon } = dailyForecast;

          return (
            <Col sm="4" key={`daily-forecast-${time}`}>
              <div className="p-3 forecast d-flex align-items-center justify-content-center">
                <WeatherIcon icon={icon} />
                <div className="text-truncate">
                  <div className="conditions text-truncate">
                    {summary}
                  </div>
                  <div className="high-low">
                    {temperatureMin.toFixed(0)}
                    <span className="text-muted px-1">/</span>
                    {temperatureMax.toFixed(0)}
                  </div>
                  <div className="date">
                    {format(new Date(time * 1000), 'EEEE, LLL d')}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}

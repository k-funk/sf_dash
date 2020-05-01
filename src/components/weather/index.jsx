import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Row, Col, Card, CardBody, CardFooter } from 'reactstrap';
import classNames from 'classnames';

import TimeSinceLastUpdated from '../time_since_last_updated';
import SidePanel from './side_panel';
import HourlyForecast from './hourly_forecast';
import ThreeDayForecast from './three_day_forecast';


export default class Weather extends PureComponent {
  static propTypes = {
    className: T.string,
    locations: T.arrayOf(
      T.shape({
        todaysForecast: T.object,
        hourlyForecasts: T.array,
        dailyForecasts: T.array,
        alerts: T.array,
        readable: T.string,
      }),
    ),
    _callFailedError: T.bool,
    lastUpdated: T.object, // a moment object
    msUntilWarning: T.number,
  };

  static defaultProps = {
    className: '',
    locations: [],
  }

  render() {
    const {
      className,
      locations,
      _callFailedError,
      lastUpdated,
      msUntilWarning,
    } = this.props;

    return (
      <div className={classNames(className, 'weather')}>
        {_callFailedError && (
          <div className="error-msg">
            <span className="fas fa-exclamation-circle mr-1" />
            <span>
              First weather request failed. Make sure {'you\'ve'} supplied an API Key in the{' '}
              <a href="#/settings">settings</a>.
            </span>
          </div>
        )}

        {locations.map(location => {
          const {
            todaysForecast,
            hourlyForecasts,
            dailyForecasts,
            alerts,
            readable,
            lat,
            long,
          } = location;

          return (
            <Card className="mb-2" key={`${lat},${long}`}>
              <div className="location-readable">
                <small>{readable}</small>
              </div>

              <CardBody>
                <Row className="slim-gutters">
                  <Col xs="5">
                    <SidePanel
                      todaysForecast={todaysForecast}
                      hourlyForecasts={hourlyForecasts}
                      alerts={alerts}
                    />
                  </Col>
                  <Col xs="7">
                    <HourlyForecast
                      hourlyForecasts={hourlyForecasts}
                    />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="bg-transparent py-0">
                <ThreeDayForecast dailyForecasts={dailyForecasts} />
              </CardFooter>
            </Card>
          );
        })}

        <TimeSinceLastUpdated lastUpdated={lastUpdated} msUntilWarning={msUntilWarning} />
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import classNames from 'classnames';

import LocalStorage, { WEATHER_KEY_KEY, WEATHER_UNITS_KEY } from 'app/utils/local_storage';
import { WARNING_AFTER_N_MISSED_CALLS } from 'app/constants';
import DarkSky from 'app/integrations/darksky';
import TimeSinceLastUpdated from 'app/components/time_since_last_updated';
import ErrorMessage from 'app/components/error_message';

import SidePanel from './side_panel';
import HourlyForecast from './hourly_forecast';
import ThreeDayForecast from './three_day_forecast';


export const CALL_INTERVAL = 15 * 60 * 1000;
export const MS_UNTIL_WARNING = CALL_INTERVAL * WARNING_AFTER_N_MISSED_CALLS;
export const LOCATIONS = [
  { readable: 'Bernal Heights', lat: 37.7448205, long: -122.4100494 },
];

export default class Weather extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      fetchError: false,
      lastUpdated: undefined,
      loading: false,
    };
  }

  async componentDidMount() {
    await this.updateWeatherLocations();
    this.interval = setInterval(this.updateWeatherLocations, CALL_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateWeatherLocations = async () => {
    const key = LocalStorage.get(WEATHER_KEY_KEY);
    const units = LocalStorage.get(WEATHER_UNITS_KEY);
    try {
      const locationsResponses = await DarkSky.fetchAllLocationsWeatherData(LOCATIONS, key, units);

      this.setState({ loading: true });
      this.setState({
        locations: locationsResponses.map((locationResponse, idx) => {
          const { hourly, daily, alerts } = locationResponse.data;

          return {
            dailyForecasts: daily.data,
            hourlyForecasts: hourly.data,
            alerts,
            ...LOCATIONS[idx],
          };
        }),
        lastUpdated: new Date(),
        fetchError: false,
        loading: false,
      });
    } catch (e) {
      console.error(e);
      // jsonp makes error handling difficult. just assume it was user error
      this.setState({
        fetchError: true,
        loading: false,
      });
    }
  }

  render() {
    const { className } = this.props;
    const { locations, lastUpdated, fetchError, loading } = this.state;

    return (
      <div className={classNames(className, 'weather')}>
        {fetchError && (
          <ErrorMessage>
            Weather request failed. Make sure {'you\'ve'} supplied an API Key in the{' '}
            <a href="#/settings">settings</a>.
          </ErrorMessage>
        )}

        {locations.map(location => {
          const {
            hourlyForecasts,
            dailyForecasts,
            alerts,
            readable,
            lat,
            long,
          } = location;

          return (
            <Card className="mb-2" key={`${lat},${long}`}>
              <CardHeader className="text-center py-1 text-uppercase">
                {readable}
              </CardHeader>

              <CardBody>
                <Row className="slim-gutters">
                  <Col md="5">
                    <SidePanel
                      dailyForecasts={dailyForecasts}
                      hourlyForecasts={hourlyForecasts}
                      alerts={alerts}
                    />
                  </Col>
                  <Col md="7">
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

        <div className="d-flex justify-content-end">
          <TimeSinceLastUpdated
            lastUpdated={lastUpdated}
            msUntilWarning={MS_UNTIL_WARNING}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

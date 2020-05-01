import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Table } from 'reactstrap';
import moment from 'moment';
import classNames from 'classnames';

import { MIN_CHANCE_OF_RAIN } from 'app/constants';

import WeatherIcon from '../icon';


export default class HourlyForecast extends PureComponent {
  static propTypes = {
    className: T.string,
    hourlyForecasts: T.arrayOf(
      T.shape({
        time: T.number,
        temperature: T.number,
        uvIndex: T.number,
        humidity: T.number,
        precipProbability: T.number,
        apparentTemperature: T.number,
        icon: T.string,
        summary: T.string,
      }),
    ),
  };

  static defaultProps = {
    className: '',
    hourlyForecasts: [],
  }

  render() {
    const { className, hourlyForecasts } = this.props;

    return (
      <Table className="mb-0">
        <thead>
          <tr>
            <th>Time</th>
            <th>Condition</th>
            <th data-toggle="tooltip" title="Temp/Feels Like">Temp/FL</th>
            <th>UVI</th>
            <th>POP</th>
            <th>Humid</th>
          </tr>
        </thead>
        <tbody>
          {hourlyForecasts.slice(0, 12).map(hourlyForecast => {
            const {
              time,
              temperature,
              uvIndex,
              humidity,
              precipProbability,
              apparentTemperature,
              icon,
              summary,
            } = hourlyForecast;

            return (
              <tr key={`hourly-forecast-${time}`}>
                <td>
                  {moment(time * 1000).format('hA')}
                </td>
                <td>
                  <WeatherIcon icon={icon} /> {summary}
                </td>
                <td>
                  {temperature.toFixed(0)}/{apparentTemperature.toFixed(0)}&deg;
                </td>
                <td>
                  {uvIndex}
                </td>
                <td
                  className={classNames(
                    className, { 'text-info': precipProbability >= MIN_CHANCE_OF_RAIN },
                  )}
                >
                  {(precipProbability * 100).toFixed(0)}%
                </td>
                <td>
                  {(humidity * 100).toFixed(0)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

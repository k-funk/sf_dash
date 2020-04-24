import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


export default class WeatherAlerts extends PureComponent {
  static propTypes = {
    className: T.string,
    alerts: T.arrayOf(
      T.shape({
        title: T.string,
      }),
    ),
  };

  render() {
    const { className, alerts } = this.props;

    if (!alerts) { return null; }

    return (
      <div className={classNames(className, 'col-xs-12 alerts')}>
        <ul>
          {alerts.map(alert => (
            <li key={alert.title}>{alert.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

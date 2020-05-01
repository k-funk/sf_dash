import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


export default class Alerts extends PureComponent {
  static propTypes = {
    className: T.string,
    alerts: T.arrayOf(
      T.shape({
        title: T.string,
      }),
    ),
  };

  static defaultProps = {
    className: '',
    alerts: [],
  }

  render() {
    const { className, alerts } = this.props;

    if (!alerts.length) { return null; }

    return (
      <div className={classNames(className, 'col-12 alerts')}>
        <ul>
          {alerts.map(alert => (
            <li key={alert.title}>{alert.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

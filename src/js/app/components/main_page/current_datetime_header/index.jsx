import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import moment from 'moment';
import 'moment-precise-range-plugin';
import classNames from 'classnames';


export const INTERVAL_MS = 1000;

export default class CurrentDateTimeHeader extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), INTERVAL_MS);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { className } = this.props;

    const now = moment();
    const date = now.format('MMMM Do, YYYY');
    const time = now.format('h:mm');

    return (
      <div className={classNames(className, 'current-time', 'row', 'py-1', 'align-items-baseline')}>
        <div className="time col-6">{time}</div>
        <div className="date col-6">{date}</div>
      </div>
    );
  }
}

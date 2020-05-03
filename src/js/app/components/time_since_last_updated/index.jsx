import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import moment from 'moment';
import 'moment-precise-range-plugin';
import classNames from 'classnames';


export const INTERVAL_MS = 1000;

export default class TimeSinceLastUpdated extends PureComponent {
  static propTypes = {
    className: T.string,
    lastUpdated: T.object, // a moment object
    msUntilWarning: T.number,
  };

  static defaultProps = {
    className: '',
    lastUpdated: null,
    msUntilWarning: 60000, // 1min
  }

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), INTERVAL_MS);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getReadableTime = () => {
    const { lastUpdated } = this.props;

    const timeAgo = lastUpdated.preciseDiff(moment());

    if (!timeAgo) { // timeText is empty if diff is 0
      return 'Just now.';
    }
    return `${timeAgo} ago.`;
  }

  isOverdue = () => {
    const { lastUpdated, msUntilWarning } = this.props;
    return moment().diff(lastUpdated) >= msUntilWarning;
  }

  render() {
    const { className, lastUpdated } = this.props;

    if (!lastUpdated) { return null; }

    const overdue = this.isOverdue();

    return (
      <span className={classNames(className, 'time-since-last-updated', { overdue })}>
        {this.getReadableTime()}
      </span>
    );
  }
}

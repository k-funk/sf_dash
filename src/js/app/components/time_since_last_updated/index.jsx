import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import moment from 'moment';
import 'moment-precise-range-plugin';
import classNames from 'classnames';

import Loader from '../loader';


export const INTERVAL_MS = 1000;

export default class TimeSinceLastUpdated extends PureComponent {
  static propTypes = {
    className: T.string,
    lastUpdated: T.object, // a moment object
    msUntilWarning: T.number,
    loading: T.bool,
  };

  static defaultProps = {
    className: '',
    lastUpdated: null,
    msUntilWarning: 60000, // 1min
    loading: false,
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
    const { className, lastUpdated, loading } = this.props;

    const overdue = this.isOverdue();

    return (
      <div className={classNames(className, 'time-since-last-updated')}>
        <span className={classNames({ overdue })}>
          {lastUpdated && this.getReadableTime()}
        </span>
        <Loader className="my-1 ml-auto" loading={loading} small />
      </div>
    );
  }
}

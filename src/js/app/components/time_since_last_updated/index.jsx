import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import { differenceInMilliseconds, formatDistanceStrict } from 'date-fns';

import Loader from '../loader';


export const INTERVAL_MS = 250;

export default class TimeSinceLastUpdated extends PureComponent {
  static propTypes = {
    className: T.string,
    lastUpdated: T.object, // a Date object
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
    const timeAgo = formatDistanceStrict(lastUpdated, new Date(), { roundingMethod: 'round' });

    // comparing strings might lead to issues down the road, but i don't want to call both
    // differenceInMilliseconds AND formatDistanceStrict on each render
    if (timeAgo === '0 seconds') {
      return 'Just now.';
    }
    return `${timeAgo} ago.`;
  }

  isOverdue = () => {
    const { lastUpdated, msUntilWarning } = this.props;

    if (!lastUpdated) { return false; }

    return differenceInMilliseconds(new Date(), lastUpdated) >= msUntilWarning;
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

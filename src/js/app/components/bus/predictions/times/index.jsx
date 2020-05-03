import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


export default class Times extends PureComponent {
  static propTypes = {
    className: T.string,
    predictionTimes: T.arrayOf(
      T.shape({
        _tripTag: T.string, // used to generate react `key`s
        _affectedByLayover: T.string,
        _minutes: T.string,
      }),
    ),
  };

  static defaultProps = {
    className: '',
    predictionTimes: [],
  }

  render() {
    const { className, predictionTimes } = this.props;

    return (
      <div className={classNames(className, 'prediction-times')}>
        {predictionTimes.length ? (
          <>
            {predictionTimes.slice(0, 4).map((time, idx) => (
              <span key={`${time._tripTag}`}>
                <span
                  className={classNames(
                    'prediction-time',
                    {
                      'not-affected-by-layover': !time._affectedByLayover,
                      'next-time': idx === 0,
                      'other-time': idx !== 0,
                    },
                  )}
                >
                  {time._minutes === '0' ? 'Now' : time._minutes}
                </span>
                {idx !== (predictionTimes.length - 1) && ', '}
              </span>
            ))}
          </>
        ) : (
          <span className="no-prediction-time">None</span>
        )}
      </div>
    );
  }
}

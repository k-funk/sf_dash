import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


export default class StopInfo extends PureComponent {
  static propTypes = {
    className: T.string,
    prediction: T.shape({
      direction: T.shape({
        _title: T.string,
      }),
      _stopTitle: T.string,
      _dirTitleBecauseNoPredictions: T.string,
    }),
  };

  static defaultProps = {
    className: '',
    prediction: {},
  }

  render() {
    const { className, prediction } = this.props;
    const { direction, _dirTitleBecauseNoPredictions, _stopTitle } = prediction;

    return (
      <div className={classNames(className)}>
        <div className="font-weight-bold">
          {direction?._title || _dirTitleBecauseNoPredictions}
        </div>
        <div>
          @{_stopTitle}
        </div>
      </div>
    );
  }
}

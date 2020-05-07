import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';

import StopInfo from '../stop_info';
import Times from './times';


export default class Predictions extends PureComponent {
  static propTypes = {
    className: T.string,
    predictions: T.arrayOf(
      T.shape({
        _routeTag: T.string,
        _stopTag: T.string, // used to generate react `key`s
        direction: T.shape({
          prediction: T.arrayOf(
            T.shape({
              _tripTag: T.string, // used to generate react `key`s
              _affectedByLayover: T.string,
              _minutes: T.string,
            }),
          ),
        }),
      }),
    ),
  };

  static defaultProps = {
    className: '',
    predictions: [],
  }

  render() {
    const { className, predictions } = this.props;

    return (
      <div className={classNames(className)}>
        {predictions.map(prediction => {
          const { _routeTag, _stopTag, direction } = prediction;
          return (
            <Card className="mb-2" key={`${_routeTag}-${_stopTag}`}>
              <CardBody className="d-flex align-items-center justify-content-between">
                <div className="route-tag">
                  {_routeTag}
                </div>

                <div className="right-container">
                  <Times predictionTimes={direction?.prediction} />
                  <StopInfo prediction={prediction} />
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  }
}

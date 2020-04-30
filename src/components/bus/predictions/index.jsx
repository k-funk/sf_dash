import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Button, Card, CardBody } from 'reactstrap';
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
              _affectedByLayover: T.bool, // TODO: not certain of this type
              _minutes: T.string,
            }),
          ),
        }),
      }),
    ),
    removeStopRoute: T.func.isRequired,
  };

  static defaultProps = {
    className: '',
    predictions: [],
  }

  render() {
    const { className, predictions, removeStopRoute } = this.props;

    // FIXME: hook up with parent
    const showBusRemoval = false;

    return (
      <div className={classNames(className, 'predictions')}>
        {predictions.map(prediction => {
          const { _routeTag, _stopTag, direction } = prediction;
          return (
            <Card className="mb-2" key={`${_routeTag}-${_stopTag}`}>
              <CardBody className="d-flex align-items-center justify-content-between">

                <div className="route-tag">
                  {_routeTag}
                </div>

                <div className="right-container">

                  {showBusRemoval ? (
                    <Button color="danger" className="remove-stop" onClick={removeStopRoute}>
                      Remove Stop
                    </Button>
                  ) : (
                    <Times predictionTimes={direction?.prediction} />
                  )}

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

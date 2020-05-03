import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Button, Card, CardBody } from 'reactstrap';
import classNames from 'classnames';

import NextBus from 'app/integrations/nextbus';
import { removeBusStopFromLocalStorage } from 'app/utils/local_storage';

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
    showBusRemove: T.bool.isRequired,
    onAddOrRemoveStop: T.func.isRequired,
  };

  static defaultProps = {
    className: '',
    predictions: [],
  }

  removeStop = (routeTag, stopTag) => {
    const routeStopTag = NextBus.getRouteStopTag(routeTag, stopTag);
    const { onAddOrRemoveStop } = this.props;

    removeBusStopFromLocalStorage(routeStopTag);
    onAddOrRemoveStop();
  }


  render() {
    const { className, predictions, showBusRemove } = this.props;

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

                  {showBusRemove ? (
                    <Button
                      color="danger"
                      className="remove-stop"
                      onClick={() => this.removeStop(_routeTag, _stopTag)}
                    >
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

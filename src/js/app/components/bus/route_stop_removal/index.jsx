import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Button, Card, CardBody } from 'reactstrap';
import classNames from 'classnames';

import NextBus from 'app/integrations/nextbus';
import LocalStorage from 'app/utils/local_storage';


export default class RouteStopRemoval extends PureComponent {
  static propTypes = {
    className: T.string,
    onAddOrRemoveStop: T.func.isRequired,
  };

  removeStop = (routeTag, stopTag) => {
    const routeStopTag = NextBus.getRouteStopTag(routeTag, stopTag);
    const { onAddOrRemoveStop } = this.props;

    LocalStorage.removeBusStopFromLocalStorage(routeStopTag);
    onAddOrRemoveStop();
    this.forceUpdate();
  }


  render() {
    const { className } = this.props;
    const routeStopTags = LocalStorage.getBusStopsFromLocalStorage();

    return (
      <div className={classNames(className)}>
        {routeStopTags.map(routeStopTag => {
          const [routeTag, stopTag] = NextBus.splitRouteStopTag(routeStopTag);
          return (
            <Card className="mb-2" key={`${routeTag}-${stopTag}`}>
              <CardBody className="d-flex align-items-center justify-content-between">
                <div className="route-tag">
                  {routeTag}
                </div>

                <div className="right-container">
                  <Button
                    color="danger"
                    className="remove-stop"
                    onClick={() => this.removeStop(routeTag, stopTag)}
                    size="lg"
                  >
                    Remove Stop
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  }
}

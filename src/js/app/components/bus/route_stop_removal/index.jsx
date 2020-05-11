import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Button } from 'reactstrap';
import classNames from 'classnames';

import NextBus from 'app/integrations/nextbus';
import LocalStorage from 'app/utils/local_storage';
import RouteStopCard from '../route_stop_card';


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
            <RouteStopCard routeTag={routeTag} key={routeStopTag}>
              <Button
                color="danger"
                size="lg"
                onClick={() => this.removeStop(routeTag, stopTag)}
              >
                Remove Stop
              </Button>
            </RouteStopCard>
          );
        })}
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';


export default class RouteStopCard extends PureComponent {
  static propTypes = {
    className: T.string,
    routeTag: T.string.isRequired,
    children: T.node.isRequired,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, routeTag, children } = this.props;

    return (
      <Card className={classNames(className, 'mb-2')}>
        <CardBody className="d-flex align-items-center justify-content-between">
          <div className="route-tag">
            {routeTag}
          </div>

          <div className="route-tag-details">
            {children}
          </div>
        </CardBody>
      </Card>
    );
  }
}

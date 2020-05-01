import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Row, Col } from 'reactstrap';
import classNames from 'classnames';

import CurrentDateTimeHeader from '../current_datetime_header';
import Bus from '../bus';
import Weather from '../weather';


export default class MainPage extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(className)}>
        <CurrentDateTimeHeader />
        <Row className="slim-gutters">
          <Col sm="5" className="mb-4">
            <Bus />
          </Col>
          <Col sm="7" className="mb-4">
            <Weather />
          </Col>
        </Row>
      </div>
    );
  }
}

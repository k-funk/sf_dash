import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Row, Col } from 'reactstrap';
import { format } from 'date-fns';
import classNames from 'classnames';


export const INTERVAL_MS = 1000;

export default class CurrentDateTimeHeader extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), INTERVAL_MS);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { className } = this.props;

    const now = new Date();
    const date = format(now, 'MMMM do, yyy');
    const time = format(now, 'h:mm');

    return (
      <Row className={classNames(className, 'current-time', 'py-3', 'py-md-1', 'align-items-baseline')}>
        <Col xs="6" className="time">
          {time}
        </Col>
        <Col xs="6" className="date">
          {date}
        </Col>
      </Row>
    );
  }
}

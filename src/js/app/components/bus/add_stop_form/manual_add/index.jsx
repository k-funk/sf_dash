import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Form, FormGroup, Row, Col, Button, Input, Label } from 'reactstrap';
import classNames from 'classnames';

import NextBus from 'app/integrations/nextbus';
import LocalStorage from 'app/utils/local_storage';


export default class ManualAdd extends PureComponent {
  static propTypes = {
    className: T.string,
    onAddOrRemoveStop: T.func.isRequired,
  };

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      routeTag: '',
      stopTag: '',
      stopIsValid: undefined,
    };
  }

  onChange = (event, field) => {
    this.setState({ [field]: event.target.value });
  }

  validateAndAddStop = async event => {
    event.preventDefault();
    const { onAddOrRemoveStop } = this.props;
    const { routeTag, stopTag } = this.state;
    const routeStopTag = NextBus.getRouteStopTag(routeTag, stopTag);
    this.setState({ stopIsValid: undefined });

    if (await NextBus.isValidStop(routeStopTag)) {
      this.setState({ stopIsValid: true });
      LocalStorage.addBusStopToLocalStorage(routeStopTag);
      onAddOrRemoveStop();
      return;
    }

    this.setState({ stopIsValid: false });
  }

  render() {
    const { className } = this.props;
    const { routeTag, stopTag, stopIsValid } = this.state;

    return (
      <Form onSubmit={this.validateAndAddStop} className={classNames(className)}>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="manual-add-route-tag">Route Tag:</Label>
              <Input
                type="text"
                id="manual-add-route-tag"
                className={classNames(
                  {
                    'is-valid': stopIsValid,
                    'is-invalid': stopIsValid === false,
                  },
                )}
                onChange={e => this.onChange(e, 'routeTag')}
                placeholder="12"
                value={routeTag}
              />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="manual-add-route-stop">Stop Tag:</Label>
              <Input
                type="text"
                id="manual-add-route-stop"
                className={classNames(
                  {
                    'is-valid': stopIsValid,
                    'is-invalid': stopIsValid === false,
                  },
                )}
                onChange={e => this.onChange(e, 'stopTag')}
                placeholder="5837"
                value={stopTag}
              />
            </FormGroup>
          </Col>
        </Row>
        <div>
          <Button color="primary" type="submit">Validate & Add Stop</Button>
        </div>
      </Form>
    );
  }
}

import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Form, FormGroup, Row, Col, Button, Input, Label } from 'reactstrap';
import classNames from 'classnames';


export default class ManualAdd extends PureComponent {
  static propTypes = {
    className: T.string,
    addForm: T.shape({
      validate: T.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, addForm } = this.props;

    return (
      <Form onSubmit={addForm.validate} className={classNames(className)}>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="manual-add-route-tag">Route Tag:</Label>
              {/* TODO: ng-model="nextBus.addForm.routeTag" */}
              <Input type="text" onChange={() => {}} id="manual-add-route-tag" />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="manual-add-route-stop">Stop Tag:</Label>
              {/* TODO: ng-model="nextBus.addForm.stopTag" */}
              <Input type="text" onChange={() => {}} id="manual-add-route-stop" />
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

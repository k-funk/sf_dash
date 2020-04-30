import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
} from 'reactstrap';
import classNames from 'classnames';

import DarkLightModeSelector from '../dark_light_mode_selector';


export const ANGULAR_LOCAL_STORAGE_PREFIX = 'ngStorage-';
export const WEATHER_KEY_KEY = 'weatherKey';
export const WEATHER_UNITS_KEY = 'weatherUnits';
export const HTML_CLASS_KEY = 'htmlClass';
export const ALL_SETTINGS_KEYS = [
  WEATHER_KEY_KEY,
  WEATHER_UNITS_KEY,
  HTML_CLASS_KEY,
].reduce(
  // include legacy keys
  (fullArray, key) => ([...fullArray, key, `${ANGULAR_LOCAL_STORAGE_PREFIX}${key}`]),
  [],
);

export default class Settings extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    weatherKeyIsValid: undefined,
    weatherKeyValue: this.getLocalStorage(WEATHER_KEY_KEY),
    weatherUnits: this.getLocalStorage(WEATHER_UNITS_KEY),
  })

  getLocalStorage = key => (
    JSON.parse((
      window.localStorage.getItem(key) ||
      // legacy support
      window.localStorage.getItem(`${ANGULAR_LOCAL_STORAGE_PREFIX}${key}`)
    )) || ''
  );

  setLocalStorage = (key, val) => (
    window.localStorage.setItem(key, JSON.stringify(val))
  );

  onWeatherKeyChange = event => {
    this.setState({ weatherKeyValue: event.target.value });
  }

  validateAndSetKey = event => {
    event.preventDefault();
    const { weatherKeyValue } = this.state;
    // FIXME. see weatherSvc.validateKey
    const condition = true;
    if (condition) {
      this.setState({ weatherKeyIsValid: true });
      this.setLocalStorage(WEATHER_KEY_KEY, weatherKeyValue);
      return;
    }

    this.setState({ weatherKeyIsValid: false });
  }

  setWeatherUnits = units => {
    this.setState({ weatherUnits: units });
    this.setLocalStorage(WEATHER_UNITS_KEY, units);
  }

  dumpLocalStorage = () => {
    ALL_SETTINGS_KEYS.forEach(key => window.localStorage.removeItem(key));
    this.setState(this.getInitialState());
  }

  render() {
    const { className } = this.props;
    const { weatherKeyIsValid, weatherKeyValue, weatherUnits } = this.state;

    return (
      <div className={classNames(className)}>
        <h1>Settings</h1>

        <Row>
          <Col xs="6">
            <Card className="mb-4">
              <CardBody>
                <h3>Global</h3>

                <DarkLightModeSelector />

                <hr />

                <Button color="danger" onClick={this.dumpLocalStorage}>Dump All Local Storage</Button>
                <p>
                  <small>
                    This will remove stored bus stops, your DarkSky key, and the weather units.
                  </small>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <Card className="mb-4">
              <CardBody>
                <h3>Bus</h3>

                <p className="text-muted">No settings currently available.</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="6">
            <Card className="mb-4">
              <CardBody>
                <h3>Weather</h3>

                <Form onSubmit={this.validateAndSetKey}>
                  <FormGroup>
                    <Label for="weather-key">DarkSky API Key:</Label>
                    <Input
                      type="text"
                      id="weather-key"
                      className={classNames(
                        {
                          'is-valid': weatherKeyIsValid,
                          'is-invalid': weatherKeyIsValid === false,
                        },
                      )}
                      onChange={this.onWeatherKeyChange}
                      value={weatherKeyValue}
                    />
                  </FormGroup>
                  <Button color="primary" type="submit">Validate & Store Key</Button>
                </Form>

                <hr />

                <FormGroup>
                  <Label className="mr-2">Weather Units:</Label>
                  <ButtonGroup>
                    <Button
                      color={weatherUnits === '' ? 'primary' : 'secondary'}
                      onClick={() => this.setWeatherUnits('')}
                    >
                      Auto
                    </Button>
                    <Button
                      color={weatherUnits === 'f' ? 'primary' : 'secondary'}
                      onClick={() => this.setWeatherUnits('f')}
                    >
                      F
                    </Button>
                    <Button
                      color={weatherUnits === 'c' ? 'primary' : 'secondary'}
                      onClick={() => this.setWeatherUnits('c')}
                    >
                      C
                    </Button>
                  </ButtonGroup>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

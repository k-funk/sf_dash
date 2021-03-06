import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
} from 'reactstrap';
import classNames from 'classnames';

import LocalStorage, {
  BUS_ROUTE_STOP_TAGS_KEY,
  WEATHER_KEY_KEY,
  WEATHER_UNITS_KEY,
} from 'app/utils/local_storage';
import DarkSky from 'app/integrations/darksky';

import DarkLightModeSelector from './dark_light_mode_selector';
import DisplayLocalStorageData from './display_local_storage_data';
import SetSampleLocalStorageData from './set_sample_local_storage_data';


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
    weatherKeyValue: LocalStorage.get(WEATHER_KEY_KEY),
    weatherUnits: LocalStorage.get(WEATHER_UNITS_KEY),
  })

  onWeatherKeyChange = event => {
    this.setState({ weatherKeyValue: event.target.value });
  }

  validateAndSetKey = async event => {
    event.preventDefault();
    const { weatherKeyValue } = this.state;

    try {
      if (await DarkSky.isValidKey(weatherKeyValue)) {
        this.setState({ weatherKeyIsValid: true });
        LocalStorage.set(WEATHER_KEY_KEY, weatherKeyValue);
        return;
      }
      this.setState({ weatherKeyIsValid: false });
    } catch (e) {
      this.setState({ weatherKeyIsValid: false });
    }
  }

  setWeatherUnits = units => {
    this.setState({ weatherUnits: units });
    LocalStorage.set(WEATHER_UNITS_KEY, units);
  }

  dumpLocalStorageAndResetState = () => {
    this.setState(this.getInitialState());
    LocalStorage.dump();
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
              <CardHeader>
                <h3 className="m-0">Global</h3>
              </CardHeader>
              <CardBody>
                <DarkLightModeSelector />

                <hr />

                <p>
                  <Button
                    color="danger"
                    onClick={this.dumpLocalStorageAndResetState}
                  >
                    Dump All Local Storage
                  </Button>
                </p>
                <p className="small">
                  This will remove stored bus stops, your DarkSky key, and the weather units.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <Card className="mb-4">
              <CardHeader>
                <h3 className="m-0">Bus</h3>
              </CardHeader>
              <CardBody>
                <DisplayLocalStorageData localStorageKey={BUS_ROUTE_STOP_TAGS_KEY} />

                <hr />

                <SetSampleLocalStorageData localStorageKey={BUS_ROUTE_STOP_TAGS_KEY} />
              </CardBody>
            </Card>
          </Col>

          <Col xs="6">
            <Card className="mb-4">
              <CardHeader>
                <h3 className="m-0">Weather</h3>
              </CardHeader>
              <CardBody>
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

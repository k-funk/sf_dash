import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Form, Input, Label, Table } from 'reactstrap';
import classNames from 'classnames';

import NextBus from 'app/integrations/nextbus';
import LocalStorage from 'app/utils/local_storage';
import Loader from 'app/components/loader';
import ErrorMessage from 'app/components/error_message';


// Warning: This won't work if this app is hosted on http. See
// https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only
// Geolocation API Removed from Unsecured Origins in Chrome 50.
// However, hosting this app on https causes a Mixed Content issue (https site requesting NextBus's
// http-only traffic). The best way to work around this for now is to proxy nextbus's http -> https
// with something like Cloudflare's Workers, and set the NEXTBUS_XML_FEED_OVERRIDE_URL env var

export default class GeolocateAdd extends PureComponent {
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
      loading: false,
      errMsg: undefined,
      nearbyStops: [],
    };
  }

  getNearbyStops = async event => {
    const meters = event.target.value;
    if (!meters) { return; }

    this.setState({ loading: true });
    try {
      const nearbyStops = await NextBus.getStopsNearMe(meters);
      this.setState({
        loading: false,
        errMsg: undefined,
        nearbyStops,
      });
    } catch (e) {
      console.error(e.message);
      this.setState({
        loading: false,
        errMsg: e.message,
      });
    }
  }

  addStop = routeStopTag => {
    const { onAddOrRemoveStop } = this.props;

    LocalStorage.addBusStopToLocalStorage(routeStopTag);
    onAddOrRemoveStop();
  }

  render() {
    const { className } = this.props;
    const { loading, errMsg, nearbyStops } = this.state;

    return (
      <>
        <Form className={classNames(className, 'mb-2')} inline>
          <Label className="mr-2">Find stops within</Label>
          <Input type="select" onChange={this.getNearbyStops}>
            {/* Values are in meters */}
            <option value="">--Choose One--</option>
            <option value="322">1/5 mile</option>
            <option value="402">1/4 mile</option>
            <option value="804">1/2 mile</option>
          </Input>
          <Loader className="ml-3" loading={loading} />
        </Form>

        <ErrorMessage>{errMsg}</ErrorMessage>

        {!!nearbyStops.length && (
          <Table striped hover className="mt-4">
            <thead>
              <tr>
                <th>Route</th>
                <th>Direction</th>
                <th>Stop</th>
              </tr>
            </thead>
            <tbody>
              {nearbyStops.map(nearbyStop => {
                const { tag, stopTag, title, directionTitle, stopTitle } = nearbyStop;
                const routeStopTag = NextBus.getRouteStopTag(tag, stopTag);

                return (
                  <tr
                    className="clickable"
                    key={routeStopTag}
                    onClick={() => this.addStop(routeStopTag)}
                  >
                    <td>{title}</td>
                    <td>{directionTitle}</td>
                    <td>{stopTitle}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </>
    );
  }
}

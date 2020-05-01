import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Alert, Form, Input, Label, Table } from 'reactstrap';
import classNames from 'classnames';


export default class GeolocateAdd extends PureComponent {
  static propTypes = {
    className: T.string,
    addForm: T.shape({
      getNearbyStops: T.func.isRequired,
      addStop: T.func.isRequired,
      loading: T.bool,
      errMsg: T.string,
      nearbyStops: T.arrayOf(T.shape({
        tag: T.string,
        stopTag: T.string,
        title: T.string,
        directionTitle: T.string,
        stopTitle: T.string,
      })),
    }).isRequired,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, addForm } = this.props;
    const { getNearbyStops, addStop, loading, errMsg, nearbyStops } = addForm;

    return (
      <>
        <Alert color="danger">
          Warning: This probably {'won\'t'} work. See{' '}
          <a
            href="https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only"
            target="_blank"
            rel="noopener noreferrer"
          >
            Geolocation API Removed from Unsecured Origins in Chrome 50
          </a>.
        </Alert>

        <Form className={classNames(className)} inline>
          <Label className="mr-2">Find stops within</Label>
          <Input type="select" onChange={getNearbyStops}>
            <option value="">--Choose One--</option>
            <option value="322">1/5 mile</option>
            <option value="402">1/4 mile</option>
            <option value="804">1/2 mile</option>
            {/* Values are in meters */}
          </Input>
        </Form>

        {nearbyStops && (
          <Table striped hover>
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
                const formattedStop = `${tag}|${stopTag}`;

                return (
                  <tr onClick={addStop(formattedStop)} key={formattedStop}>
                    <td>{title}</td>
                    <td>{directionTitle}</td>
                    <td>{stopTitle}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}

        {loading && <div className="spinner-loader" />}
        {errMsg && <div className="text-danger">{errMsg}</div>}
      </>
    );
  }
}

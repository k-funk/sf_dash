import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';
import Predictions from './predictions';
import AddStopForm from './add_stop_form';
import EditTogglers from './edit_togglers';
import TimeSinceLastUpdated from '../time_since_last_updated';


export default class Bus extends PureComponent {
  static propTypes = {
    className: T.string,
    predictions: T.arrayOf(
      T.shape({
        _routeTag: T.string,
        _stopTag: T.string, // used to generate react `key`s
        direction: T.shape({
          prediction: T.arrayOf(
            T.shape({
              _tripTag: T.string, // used to generate react `key`s
              _affectedByLayover: T.bool, // TODO: not certain of this type
              _minutes: T.string,
            }),
          ),
        }),
      }),
    ),
    removeStopRoute: T.func.isRequired,
    showBusRemoval: T.bool,
    showBusAddStopForm: T.bool.isRequired,
    addForm: T.shape({
      toggleBusAddStopForm: T.func.isRequired,
      validate: T.func.isRequired,
      getNearbyStops: T.func.isRequired,
      addStop: T.func.isRequired,
    }),
    lastUpdated: T.object, // a moment object
    msUntilWarning: T.number,
    toggleBusRemove: T.func.isRequired,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const {
      className,
      predictions,
      showBusRemoval,
      showBusAddStopForm,
      removeStopRoute,
      addForm,
      lastUpdated,
      msUntilWarning,
      toggleBusRemove,
    } = this.props;

    return (
      <div className={classNames(className, 'bus')}>
        {!predictions.length && (
          <Card className="mb-2">
            <CardBody>
              No bus stops added.
            </CardBody>
          </Card>
        )}

        <Predictions predictions={predictions} removeStopRoute={removeStopRoute} />

        {showBusAddStopForm && (
          <AddStopForm addForm={addForm} />
        )}

        {!showBusAddStopForm && (
          <div className="d-flex align-items-start justify-content-between">
            <EditTogglers
              predictions={predictions}
              showBusRemoval={showBusRemoval}
              addForm={addForm}
              toggleBusRemove={toggleBusRemove}
            />
            <TimeSinceLastUpdated lastUpdated={lastUpdated} msUntilWarning={msUntilWarning} />
          </div>
        )}
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import moment from 'moment';
import classNames from 'classnames';

import { BUS_STOP_ROUTE_TAGS_KEY, getLocalStorage } from 'app/utils/local_storage';
import { WARNING_AFTER_N_MISSED_CALLS } from 'app/constants';
import NextBus from 'app/integrations/nextbus';
import TimeSinceLastUpdated from 'app/components/time_since_last_updated';

import Predictions from './predictions';
// import AddStopForm from './add_stop_form';
// import EditTogglers from './edit_togglers';


export const CALL_INTERVAL = 10 * 1000;
export const MS_UNTIL_WARNING = CALL_INTERVAL * WARNING_AFTER_N_MISSED_CALLS;

export const sortPredictions = (stopRouteTags, predictions = []) => {
  const sortedList = [];
  predictions.forEach(prediction => {
    const stopRouteTag = `${prediction._routeTag}|${prediction._stopTag}`;
    sortedList[stopRouteTags.indexOf(stopRouteTag)] = prediction;
  });
  return sortedList;
};

export default class Bus extends PureComponent {
  static propTypes = {
    className: T.string,
    // predictions: T.arrayOf(
    //   T.shape({
    //     _routeTag: T.string,
    //     _stopTag: T.string, // used to generate react `key`s
    //     direction: T.shape({
    //       prediction: T.arrayOf(
    //         T.shape({
    //           _tripTag: T.string, // used to generate react `key`s
    //           _affectedByLayover: T.bool, // TODO: not certain of this type
    //           _minutes: T.string,
    //         }),
    //       ),
    //     }),
    //   }),
    // ),
    // removeStopRoute: T.func.isRequired,
    // showBusRemoval: T.bool,
    // showBusAddStopForm: T.bool.isRequired,
    // addForm: T.shape({
    //   toggleBusAddStopForm: T.func.isRequired,
    //   validate: T.func.isRequired,
    //   getNearbyStops: T.func.isRequired,
    //   addStop: T.func.isRequired,
    // }),
    // toggleBusRemove: T.func.isRequired,
  };

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      predictions: [],
      // error: '',
      lastUpdated: undefined,
    };
  }

  componentDidMount() {
    this.updateBusPredictions();
    this.interval = setInterval(this.updateBusPredictions, CALL_INTERVAL);
  }

  async componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateBusPredictions = async () => {
    const stopRouteTags = getLocalStorage(BUS_STOP_ROUTE_TAGS_KEY);

    // Don't send an empty request
    if (!stopRouteTags.length) { return; }

    try {
      const predictionResponse = await NextBus.getPredictions(stopRouteTags);

      this.setState({
        predictions: sortPredictions(
          stopRouteTags, predictionResponse.body.predictions,
        ),
        // error: predictionResponse?.body?.Error?.__text,
        lastUpdated: moment(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const {
      className,
      // FIXME: only passed these default values to make errors less noisy while refactoring
      // showBusRemoval = false,
      // showBusAddStopForm = false,
      // removeStopRoute = () => {},
      // addForm = {
      //   toggleBusAddStopForm: () => {},
      //   getNearbyStops: () => {},
      //   validate: () => {},
      //   addStop: () => {},
      // },
      // toggleBusRemove = () => {},
    } = this.props;
    // FIXME: do something with state.error
    const { predictions, lastUpdated } = this.state;

    return (
      <div className={classNames(className, 'bus')}>
        {!predictions.length && (
          <Card className="mb-2">
            <CardBody>
              No bus stops added.
            </CardBody>
          </Card>
        )}

        {/* FIXME: empty arrow fn */}
        <Predictions predictions={predictions} removeStopRoute={() => {}} />

        {/*
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
          </div>
        )}
        */}

        <TimeSinceLastUpdated lastUpdated={lastUpdated} msUntilWarning={MS_UNTIL_WARNING} />
      </div>
    );
  }
}

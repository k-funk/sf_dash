import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import moment from 'moment';
import classNames from 'classnames';

import LocalStorage from 'app/utils/local_storage';
import { WARNING_AFTER_N_MISSED_CALLS } from 'app/constants';
import NextBus from 'app/integrations/nextbus';
import TimeSinceLastUpdated from 'app/components/time_since_last_updated';
import ErrorMessage from 'app/components/error_message';

import Predictions from './predictions';
import AddStopForm from './add_stop_form';
import EditTogglers from './edit_togglers';
import RouteStopRemoval from './route_stop_removal';


export const CALL_INTERVAL = 10 * 1000;
export const MS_UNTIL_WARNING = CALL_INTERVAL * WARNING_AFTER_N_MISSED_CALLS;

export const sortPredictions = (routeStopTags, predictions = []) => {
  const sortedList = [];
  predictions.forEach(prediction => {
    const routeStopTag = `${prediction._routeTag}|${prediction._stopTag}`;
    sortedList[routeStopTags.indexOf(routeStopTag)] = prediction;
  });
  return sortedList;
};

export default class Bus extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      predictions: [],
      lastUpdated: undefined,
      showAddStopForm: false,
      showBusRemove: false,
      loading: false,
      errMsg: undefined,
    };
  }

  async componentDidMount() {
    await this.updateBusPredictions();
    this.interval = setInterval(() => this.updateBusPredictions(), CALL_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleAddStopForm = () => {
    const { showAddStopForm } = this.state;
    this.setState({ showAddStopForm: !showAddStopForm });
  }

  onAddOrRemoveStop = async () => {
    clearInterval(this.interval);
    await this.updateBusPredictions();
    this.interval = setInterval(this.updateBusPredictions, CALL_INTERVAL);
  }

  toggleShowBusRemove = () => {
    const { showBusRemove } = this.state;
    this.setState({ showBusRemove: !showBusRemove });
  }

  updateBusPredictions = async () => {
    const routeStopTags = LocalStorage.getBusStopsFromLocalStorage();

    // Don't send an empty request
    if (!routeStopTags.length) { return; }

    this.setState({ loading: true });
    try {
      const predictionResponse = await NextBus.getPredictions(routeStopTags);

      this.setState({
        predictions: sortPredictions(routeStopTags, predictionResponse.body.predictions),
        loading: false,
        lastUpdated: moment(),
        errMsg: undefined,
      });
    } catch (e) {
      console.error(e.message);
      this.setState({
        loading: false,
        errMsg: e.message,
        lastUpdated: moment(),
      });
    }
  }

  render() {
    const { className } = this.props;
    const {
      predictions,
      lastUpdated,
      showAddStopForm,
      showBusRemove,
      loading,
      errMsg,
    } = this.state;

    return (
      <div className={classNames(className, 'bus')}>
        {!errMsg && !predictions.length && (
          <Card className="mb-2">
            <CardBody>
              No bus stops added.
            </CardBody>
          </Card>
        )}

        {showBusRemove ? (
          <RouteStopRemoval onAddOrRemoveStop={this.onAddOrRemoveStop} />
        ) : (
          <Predictions
            predictions={predictions}
          />
        )}

        {showAddStopForm && (
          <AddStopForm
            toggleAddStopForm={this.toggleAddStopForm}
            onAddOrRemoveStop={this.onAddOrRemoveStop}
          />
        )}

        {!showAddStopForm && (
          <div className="d-flex align-items-start justify-content-between">
            <EditTogglers
              toggleAddStopForm={this.toggleAddStopForm}
              showBusRemove={showBusRemove}
              toggleShowBusRemove={this.toggleShowBusRemove}
            />

            <TimeSinceLastUpdated
              lastUpdated={lastUpdated}
              msUntilWarning={MS_UNTIL_WARNING}
              loading={loading}
            />
          </div>
        )}

        <ErrorMessage>{errMsg}</ErrorMessage>
      </div>
    );
  }
}

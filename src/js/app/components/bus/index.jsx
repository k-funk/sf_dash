import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import moment from 'moment';
import classNames from 'classnames';

import LocalStorage, { BUS_STOP_ROUTE_TAGS_KEY } from 'app/utils/local_storage';
import { WARNING_AFTER_N_MISSED_CALLS } from 'app/constants';
import NextBus from 'app/integrations/nextbus';
import TimeSinceLastUpdated from 'app/components/time_since_last_updated';

import Predictions from './predictions';
import AddStopForm from './add_stop_form';
import EditTogglers from './edit_togglers';


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
      showAddStopForm: false,
      showBusRemove: false,
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

  async updateBusPredictions() {
    const stopRouteTags = LocalStorage.get(BUS_STOP_ROUTE_TAGS_KEY);

    // Don't send an empty request
    if (!stopRouteTags.length) { return; }

    try {
      const predictionResponse = await NextBus.getPredictions(stopRouteTags);

      this.setState({
        predictions: sortPredictions(
          stopRouteTags, predictionResponse.body.predictions,
        ),
        // FIXME: do something with this
        // error: predictionResponse?.body?.Error?.__text,
        lastUpdated: moment(),
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  render() {
    const { className } = this.props;
    const { predictions, lastUpdated, showAddStopForm, showBusRemove } = this.state;

    return (
      <div className={classNames(className, 'bus')}>
        {!predictions.length && (
          <Card className="mb-2">
            <CardBody>
              No bus stops added.
            </CardBody>
          </Card>
        )}

        <Predictions
          predictions={predictions}
          showBusRemove={showBusRemove}
          onAddOrRemoveStop={this.onAddOrRemoveStop}
        />

        {showAddStopForm && (
          <AddStopForm
            toggleAddStopForm={this.toggleAddStopForm}
            onAddOrRemoveStop={this.onAddOrRemoveStop}
          />
        )}

        {!showAddStopForm && (
          <div className="d-flex align-items-start justify-content-between">
            <EditTogglers
              predictions={predictions}
              toggleAddStopForm={this.toggleAddStopForm}
              showBusRemove={showBusRemove}
              toggleShowBusRemove={this.toggleShowBusRemove}
            />

            <TimeSinceLastUpdated lastUpdated={lastUpdated} msUntilWarning={MS_UNTIL_WARNING} />
          </div>
        )}
      </div>
    );
  }
}

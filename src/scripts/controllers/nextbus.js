import angular from 'angular';
import moment from 'moment';
import 'moment-precise-range-plugin';

import { BUS_STOP_ROUTE_TAGS_KEY, getLocalStorage } from '../../utils/local_storage';
import { WARNING_AFTER_N_MISSED_CALLS } from '../constants';
import NextBus from '../../integrations/nextbus';


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

angular.module('sfDashApp').controller(
  'NextbusCtrl',
  ['$scope', '$interval', ($scope, $interval) => {
    const stopRouteTags = getLocalStorage(BUS_STOP_ROUTE_TAGS_KEY);

    const updatePredictions = async () => {
      // Don't send an empty request
      if (!stopRouteTags.length) { return; }

      const predictionResponse = await NextBus.getPredictions(stopRouteTags);

      $scope.nextBus.predictions = sortPredictions(
        stopRouteTags, predictionResponse.body.predictions,
      );
      $scope.nextBus.error = predictionResponse?.body?.Error?.__text;
      $scope.nextBus.lastUpdated = moment();
    };

    $scope.nextBus = {
      msUntilWarning: MS_UNTIL_WARNING,
      predictions: [],
      showBusRemoval: false,
      showBusAddStopForm: false,
      toggleBusRemove: () => {
        // this.showBusRemoval = !this.showBusRemoval;
      },
      removeStopRoute: prediction => {
        // const routeStopPair = `${prediction._routeTag}|${prediction._stopTag}`;
        // const idx = stopRouteTags.indexOf(routeStopPair);
        // stopRouteTags.splice(idx, 1);
        // updatePredictions();
      },
      addForm: {
        toggleBusAddStopForm: () => {
          // if (this.showBusAddStopForm === true) {
          //   this.resetForm();
          // }
          // this.showBusAddStopForm = !this.showBusAddStopForm;
        },
        getNearbyStops: () => {
          // const that = this;
          // this.loading = true;
          // nextBusSvc.getStopsWithin(this.distance)
          //   .then(stops => {
          //     that.nearbyStops = stops;
          //     that.errMsg = undefined;
          //   }, err => {
          //     if (typeof err !== 'string') {
          //       err = JSON.stringify(err);
          //     }
          //     that.errMsg = err;
          //   }).finally(() => {
          //     that.loading = false;
          //   });
        },
        validate: () => {
          // const routeStopPair = `${this.routeTag}|${this.stopTag}`;
          // const that = this;
          // nextBusSvc.getPredictions([routeStopPair])
          //   .then(() => {
          //     this.addStop(routeStopPair);
          //   }, () => {
          //     that.validStop = false;
          //   });
        },
        addStop: routeStopPair => {
          // stopRouteTags.push(routeStopPair); // i think that this was adding to localstorage
          // updatePredictions();
          // this.resetForm();
        },
        resetForm: () => {
          // this.distance = undefined;
          // this.routeTag = undefined;
          // this.stopTag = undefined;
          // this.validStop = undefined;
          // this.nearbyStops = undefined;
          // this.loading = undefined;
        },
      },
    };

    updatePredictions();
    $scope.intervals.push(
      $interval(updatePredictions, CALL_INTERVAL),
    );
  }],
);

import angular from 'angular';
import moment from 'moment';
import 'moment-precise-range-plugin';

import { WARNING_AFTER_N_MISSED_CALLS } from '../constants';


export const CALL_INTERVAL = 10 * 1000;
export const MS_UNTIL_WARNING = CALL_INTERVAL * WARNING_AFTER_N_MISSED_CALLS;

angular.module('sfDashApp').controller(
  'NextbusCtrl',
  ['$scope', '$interval', '$localStorage', 'nextBusSvc', ($scope, $interval, $localStorage, nextBusSvc) => {
    $localStorage.stopRouteTags = $localStorage.stopRouteTags || [];

    const updatePredictions = () => {
      // Don't send an empty request
      if (!$localStorage.stopRouteTags.length) { return; }

      nextBusSvc.getPredictions($localStorage.stopRouteTags)
        .then(predictions => {
          $scope.nextBus.predictions = predictions;
          $scope.nextBus.lastUpdated = moment();
        });
    };

    $scope.nextBus = {
      msUntilWarning: MS_UNTIL_WARNING,
      predictions: [],
      showBusRemoval: false,
      showBusAddStopForm: false,
      toggleBusRemove: () => {
        this.showBusRemoval = !this.showBusRemoval;
      },
      removeStopRoute: prediction => {
        const routeStopPair = `${prediction._routeTag}|${prediction._stopTag}`;
        const idx = $localStorage.stopRouteTags.indexOf(routeStopPair);
        $localStorage.stopRouteTags.splice(idx, 1);
        updatePredictions();
      },
      addForm: {
        toggleBusAddStopForm: () => {
          if (this.showBusAddStopForm === true) {
            this.resetForm();
          }
          this.showBusAddStopForm = !this.showBusAddStopForm;
        },
        getNearbyStops: () => {
          const that = this;
          this.loading = true;
          nextBusSvc.getStopsWithin(this.distance)
            .then(stops => {
              that.nearbyStops = stops;
              that.errMsg = undefined;
            }, err => {
              if (typeof err !== 'string') {
                err = JSON.stringify(err);
              }
              that.errMsg = err;
            }).finally(() => {
              that.loading = false;
            });
        },
        validate: () => {
          const routeStopPair = `${this.routeTag}|${this.stopTag}`;
          const that = this;
          nextBusSvc.getPredictions([routeStopPair])
            .then(() => {
              this.addStop(routeStopPair);
            }, () => {
              that.validStop = false;
            });
        },
        addStop: routeStopPair => {
          $localStorage.stopRouteTags.push(routeStopPair);
          updatePredictions();
          this.resetForm();
        },
        resetForm: () => {
          this.distance = undefined;
          this.routeTag = undefined;
          this.stopTag = undefined;
          this.validStop = undefined;
          this.nearbyStops = undefined;
          this.loading = undefined;
        },
      },
    };

    updatePredictions();
    $scope.intervals.push(
      $interval(updatePredictions, CALL_INTERVAL),
    );
  }],
);

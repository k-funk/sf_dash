import angular from 'angular';
import moment from 'moment';


/**
 * @ngdoc function
 * @name sfDashApp.controller:NextbusCtrl
 * @description
 * # NextbusCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('NextbusCtrl', ($scope, $interval, $localStorage, nextBusSvc, WARNING_AFTER_N_MISSED_CALLS) => {
    const updatePredictions = () => {
      // Don't send an empty request
      if (!$localStorage.stopRouteTags.length) { return; }

      nextBusSvc.getPredictions($localStorage.stopRouteTags)
        .then(predictions => {
          $scope.nextBus.predictions = predictions;
          $scope.nextBus._lastUpdated = moment();
        });
    };

    $localStorage.stopRouteTags = $localStorage.stopRouteTags || [];

    $scope.callInterval = 10 * 1000;
    $scope.msUntilWarning = $scope.callInterval * WARNING_AFTER_N_MISSED_CALLS;

    $scope.nextBus = {
      predictions: [],
      toggleBusRemove() {
        this.showBusRemoval = !this.showBusRemoval;
      },
      removeStopRoute(prediction) {
        const routeStopPair = `${prediction._routeTag}|${prediction._stopTag}`;
        const idx = $localStorage.stopRouteTags.indexOf(routeStopPair);
        $localStorage.stopRouteTags.splice(idx, 1);
        updatePredictions();
      },
      addForm: {
        toggleBusAddForm() {
          if (this.showBusAddForm === true) {
            this.resetForm();
          }
          this.showBusAddForm = !this.showBusAddForm;
        },
        getNearbyStops() {
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
        validate() {
          const routeStopPair = `${this.routeTag}|${this.stopTag}`;
          const that = this;
          nextBusSvc.getPredictions([routeStopPair])
            .then(() => {
              this.addStop(routeStopPair);
            }, () => {
              that.validStop = false;
            });
        },
        addStop(routeStopPair) {
          $localStorage.stopRouteTags.push(routeStopPair);
          updatePredictions();
          this.resetForm();
        },
        resetForm() {
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
      $interval(updatePredictions, $scope.callInterval),
    );
  });

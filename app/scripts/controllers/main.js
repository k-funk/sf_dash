'use strict';

/**
 * @ngdoc function
 * @name sfDashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('MainCtrl',
    function ($scope, $interval, nextBus, weather, $localStorage, $q) {

    $localStorage.stopRouteTags = $localStorage.stopRouteTags  || [];
    var intervals = [];
    $scope.minChanceOfRain = 30;
    $scope.loc1 = '94110';
    // soma: 94103, north soma: 94105

    var updatePredictions = function () {
      // Don't send an empty request
      if (!$localStorage.stopRouteTags.length) {return;}

      nextBus.getPredictions($localStorage.stopRouteTags)
        .then(function (predictions) {
          $scope.nextBus.predictions = predictions;
          $scope.nextBus._lastUpdated = moment();
        });
    };
    $scope.nextBus = {
      predictions: [],
      toggleBusRemove: function () {
        this.showBusRemoval = !this.showBusRemoval;
      },
      removeStopRoute: function (prediction) {
        var routeStopPair = prediction._routeTag + '|' + prediction._stopTag;
        var idx = $localStorage.stopRouteTags.indexOf(routeStopPair);
        $localStorage.stopRouteTags.splice(idx, 1);
        updatePredictions();
      },
      addForm : {
        toggleBusAddForm: function () {
          if (this.showBusAddForm === true) {
            this.resetForm();
          }
          this.showBusAddForm = !this.showBusAddForm;
        },
        getNearbyStops: function () {
          var that = this;
          this.loading = true;
          nextBus.getStopsWithin(this.distance)
            .then(function (stops) {
              that.nearbyStops = stops;
              that.errMsg = undefined;
            }, function (err) {
              if (typeof err !== 'string'){
                err = JSON.stringify(err);
              }
              that.errMsg = err;
            }).finally(function () {
              that.loading = false;
          });
        },
        validate: function () {
          var routeStopPair = this.routeTag + '|' + this.stopTag;
          var that = this;
          nextBus.getPredictions([routeStopPair])
            .then(function () {
              this.addStop(routeStopPair);
            }, function () {
              that.validStop = false;
            });
        },
        addStop: function (routeStopPair) {
          $localStorage.stopRouteTags.push(routeStopPair);
          updatePredictions();
          this.resetForm();
        },
        resetForm: function () {
          this.distance = this.routeTag = this.stopTag = this.validStop =
            this.nearbyStops = this.loading = undefined;
        }
      }
    };
    updatePredictions();
    intervals.push(
      $interval(updatePredictions, 15 * 1000)
    );

    var updateWeather = function () {
      weather.getHourlyForecast($scope.loc1)
        .then(function (hForecasts) {
          $scope.weather.hForecasts = hForecasts;
          $scope.weather.rainTime = getRainTime(hForecasts);
          $scope.weather._lastUpdated = moment();
        }, function () {
          // Can't explicitly know why it failed.
          if (!angular.isDefined($scope.hForecasts)) {
            // Assume that this failure is due to no API Key
            $scope.weather._firstCallFailed = true;
          }
        });
    };
    $scope.weather = {};
    updateWeather();
    intervals.push(
      $interval(updateWeather, 15 * 60 * 1000)
    );

    var getRainTime = function (hForecasts) {
      for (var i = 0; i < hForecasts.length; i++) {
        var pop = Number(hForecasts[i].pop);
        if (pop >= $scope.minChanceOfRain) {
          return hForecasts[i];
        }
      }
    };

    $scope.$on('$destroy', function() {
      angular.forEach(intervals, function (interval) {
        $interval.cancel(interval);
      });
    });
  });


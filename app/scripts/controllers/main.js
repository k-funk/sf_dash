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
    function ($scope, $interval, nextBus, weather, $localStorage) {

    $localStorage.stopRouteTags = $localStorage.stopRouteTags  || [];
    var intervals = [];
    $scope.minChanceOfRain = 40;
    $scope.loc1 = '94110';
    // soma: 94103, north soma: 94105

    var updatePredictions = function () {
      if (!$localStorage.stopRouteTags.length) {return;}

      nextBus.getPredictions($localStorage.stopRouteTags)
        .then(function (predictions) {
          $scope.nextBus.predictions = predictions;
          $scope.nextBus._lastUpdated = moment();
        });
    };
    $scope.nextBus = {
      predictions: [],
      addForm : {
        toggleBusAddForm: function () {
          this.showBusAddForm = !this.showBusAddForm;
        },
        validate: function () {
          var routeStopPair = this.routeTag + '|' + this.stopTag;
          var that = this;
          nextBus.getPredictions([routeStopPair])
            .then(function () {
              $localStorage.stopRouteTags.push(routeStopPair);
              updatePredictions();
              that.resetForm();
            }, function () {
              that.validStop = false;
            });
        },
        resetForm: function () {
          this.routeTag = this.stopTag = this.validStop = undefined;
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


'use strict';

/**
 * @ngdoc function
 * @name sfDashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('MainCtrl', function ($scope, nextBus) {
    var stopIds = [
      '67|6208',
      '27|3930',
      '12|7552'
    ];

    nextBus.getPredictions(stopIds)
      .then(function (predictions) {
        $scope.predictions = predictions;
      });

  });

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
    function ($scope, $interval) {

    $scope.intervals = [];
    $scope.$on('$destroy', function() {
      angular.forEach($scope.intervals, function (interval) {
        $interval.cancel(interval);
      });
    });

  });


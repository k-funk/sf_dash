'use strict';

/**
 * @ngdoc function
 * @name sfDashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .constant('WARNING_AFTER_N_MISSED_CALLS', 2)
  .controller('MainCtrl',
    function ($scope, $interval) {

    $scope.intervals = [];  // Child scopes inherit this
    $scope.$on('$destroy', function() {
      angular.forEach($scope.intervals, function (interval) {
        $interval.cancel(interval);
      });
    });

  });


import angular from 'angular';


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
    ($scope, $interval) => {
      $scope.intervals = []; // Child scopes inherit this
      $scope.$on('$destroy', () => {
        angular.forEach($scope.intervals, interval => {
          $interval.cancel(interval);
        });
      });
    });

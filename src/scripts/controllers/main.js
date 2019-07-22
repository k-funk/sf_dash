import angular from 'angular';


/**
 * @ngdoc function
 * @name sfDashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('MainCtrl',
    ($scope, $interval) => {
      $scope.intervals = []; // Child scopes inherit this
      $scope.$on('$destroy', () => {
        $scope.intervals.forEach(interval => {
          $interval.cancel(interval);
        });
      });
    });

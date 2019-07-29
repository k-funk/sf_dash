import angular from 'angular';


angular.module('sfDashApp').controller(
  'MainCtrl',
  ['$scope', '$interval', ($scope, $interval) => {
    $scope.intervals = []; // Child scopes inherit this
    $scope.$on('$destroy', () => {
      $scope.intervals.forEach(interval => {
        $interval.cancel(interval);
      });
    });
  }],
);

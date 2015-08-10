'use strict';

/**
 * @ngdoc directive
 * @name sfDashApp.directive:currentTime
 * @description
 * # currentTime
 */
angular.module('sfDashApp')
  .directive('currentTime', function (dateFilter, $interval) {
    return {
      template: '<div class="current-time row">' +
                '<div class="time col-xs-6">{{time}}</div>' +
                '<div class="date col-xs-6">{{date}}</div>' +
                '</div>',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope) {
        var displayTime = function () {
          var now = moment();
          scope.date = dateFilter(now.format('MMMM Do, YYYY'));
          scope.time = dateFilter(now.format('h:mm'));
        };

        displayTime();
        var interval = $interval(displayTime, 1000);

        scope.$on('$destroy', function() {
          $interval.cancel(interval);
        });
      }
    };
  });

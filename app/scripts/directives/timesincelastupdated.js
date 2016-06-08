'use strict';

/**
 * @ngdoc directive
 * @name sfDashApp.directive:timeSinceLastUpdated
 * @description
 * # timeSinceLastUpdated
 */
angular.module('sfDashApp')
  .directive('timeSinceLastUpdated', function ($interval) {
    return {
      replace: true,
      restrict: 'EA',
      scope: {
        momentObj: '='
      },
      link: function postLink(scope, element) {

        var interval , timeText;

        interval = $interval(function() {
          if (!scope.momentObj) {return;}

          timeText = scope.momentObj.preciseDiff(moment());
          if (!timeText) { // timeText is empty if diff is 0
            element.text('Just now.');
          } else{
            element.text(timeText + ' ago.');
          }
        }, 1000);

        scope.$on('$destroy', function() {
          if (interval) {
            $interval.cancel(interval);
          }
        });
      }
    };
  });

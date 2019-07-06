import moment from 'moment';
import 'moment-precise-range';


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
        lastUpdated: '=',
        msUntilWarning: '='
      },
      link: function postLink(scope, element) {
        element.addClass('time-since-last-updated');

        var interval, timeText;

        interval = $interval(function() {
          if (!scope.lastUpdated) {return;}

          timeText = scope.lastUpdated.preciseDiff(moment());
          if (!timeText) { // timeText is empty if diff is 0
            element.text('Just now.');
          } else {
            if (moment().diff(scope.lastUpdated) > scope.msUntilWarning) {
              element.addClass('overdue');
            } else {
              element.removeClass('overdue');
            }
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

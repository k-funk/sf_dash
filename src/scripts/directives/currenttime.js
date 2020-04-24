import angular from 'angular';
import moment from 'moment';
import 'moment-precise-range-plugin';


angular.module('sfDashApp').directive(
  'currentTime',
  ['dateFilter', '$interval', (dateFilter, $interval) => ({
    template: '<div class="current-time row">'
                + '<div class="time col-6">{{time}}</div>'
                + '<div class="date col-6">{{date}}</div>'
                + '</div>',
    restrict: 'EA',
    replace: true,
    link: function postLink(scope) {
      const displayTime = () => {
        const now = moment();
        scope.date = dateFilter(now.format('MMMM Do, YYYY'));
        scope.time = dateFilter(now.format('h:mm'));
      };

      displayTime();
      const interval = $interval(displayTime, 1000);

      scope.$on('$destroy', () => {
        $interval.cancel(interval);
      });
    },
  })],
);

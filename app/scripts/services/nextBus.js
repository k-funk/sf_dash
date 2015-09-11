'use strict';

/**
 * @ngdoc service
 * @name sfDashApp.nextBus
 * @description
 * # nextBus
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .factory('nextBus', function ($http) {

    var url = 'http://webservices.nextbus.com/service/publicXMLFeed';
    var sortPredictions = function (stopRouteTags, predictions) {
      var sortedList = [];
      angular.forEach(predictions, function (prediction) {
          var stopRouteTag = prediction._routeTag + '|' + prediction._stopTag;
          sortedList[stopRouteTags.indexOf(stopRouteTag)] = prediction;
      });
      return sortedList;
    };

    return {
      getPredictions: function (stopRouteTags) {
        return $http.get(url, {params: {
          command: 'predictionsForMultiStops',
          a: 'sf-muni',
          stops: stopRouteTags
          // useShortTitles: true /* seems to not do anything */
        }})
        .then(function(data){
          // See config for xml->json arrays
          var predictions = data.data.body.predictions;
          return sortPredictions(stopRouteTags, predictions);
        });
      }
    };
  });

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

    return {
      getPredictions: function (stopCodeList) {
        return $http.get(url, {params: {
          command: 'predictionsForMultiStops',
          a: 'sf-muni',
          stops: stopCodeList
          // useShortTitles: true /* seems to not do anything */
        }})
        .then(function(data){
          // TODO: need some error handling

          // Modify the data to better fit a json schema
          var predictions = data.data.body.predictions;
          angular.forEach(predictions, function (value) {
            // Case: no predictions.
            if (!value.direction) {
              value.direction = {prediction: []};
            }
            // Case: only 1 prediction. Put the object in a new array.
            var prediction = value.direction.prediction;
            if (!angular.isArray(prediction)) {
              value.direction.prediction = [prediction];
            }
          });
          predictions._lastUpdated = moment();
          return predictions;
        });
      }
    };
  });

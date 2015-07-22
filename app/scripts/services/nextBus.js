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
        }})
        .then(function(data){
          return data.data.body.predictions;
        });
      }
    };
  });

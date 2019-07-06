/**
 * @ngdoc service
 * @name sfDashApp.nextBusSvc
 * @description
 * # nextBus
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .factory('nextBusSvc', function ($http, $q, geolocation) {

    var url = 'http://webservices.nextbus.com/service/publicXMLFeed';
    var sortPredictions = function (stopRouteTags, predictions) {
      var sortedList = [];
      angular.forEach(predictions, function (prediction) {
          var stopRouteTag = prediction._routeTag + '|' + prediction._stopTag;
          sortedList[stopRouteTags.indexOf(stopRouteTag)] = prediction;
      });
      return sortedList;
    };
    var mergeRouteData = function (routeData) {
      angular.forEach(routeData, function (route) {

        // map the stop tags
        var stopTags = {};
        angular.forEach(route.stop, function (stop) {
          stopTags[stop._tag] = stop;
        });

        angular.forEach(route.direction, function (direction) {
          for (var i = 0; i < direction.stop.length; i++) {
            var tag = direction.stop[i]._tag;
            direction.stop[i] = stopTags[tag];
          }
        });
      });
      return routeData;
    };

    return {
      getPredictions: function (stopRouteTags) {
        return $http.get(url, {params: {
          command: 'predictionsForMultiStops',
          a: 'sf-muni',
          stops: stopRouteTags,
          useShortTitles: true
        }})
        .then(function(data){
          // See config for xml->json arrays
          var predictions = data.data.body.predictions;
          return sortPredictions(stopRouteTags, predictions);
        });
      },
      getRouteConfig: function () {
        return $http.get(url, {
            cache: true,
            params: {
              command: 'routeConfig',
              a: 'sf-muni',
              useShortTitles: true
            }
        })
        .then(function(data){
          return mergeRouteData(data.data.body.route);
        });
      },
      getStopsWithin: function (meters) {
        return $q.all([
          geolocation.getLocation(),
          this.getRouteConfig()
        ]).then(function (promises) {
          /** Once we've got both the user's location and the route Data search */
          var stopResults = [],
              currPosition = new google.maps.LatLng(
                promises[0].coords.latitude,
                promises[0].coords.longitude
              ),
              routeConfig = promises[1];

          angular.forEach(routeConfig, function (route) {
            angular.forEach(route.direction, function (direction) {
              angular.forEach(direction.stop, function (stop) {
                /** Find stops that are within [meters] of the users position */
                var stopLatLng = new google.maps.LatLng(stop._lat, stop._lon);
                var distance = google.maps.geometry.spherical
                  .computeDistanceBetween(currPosition, stopLatLng);
                if (distance <= meters) {
                  stopResults.push({
                    tag: route._tag,
                    title: route._title,
                    directionName: direction._name,
                    directionTitle: direction._title,
                    latLng: stopLatLng,
                    stopId: stop._stopId,
                    stopTag: stop._tag,
                    stopTitle: stop._title
                  });
                }
              });
            });
          });

          return stopResults;
        });
      }
    };
  });

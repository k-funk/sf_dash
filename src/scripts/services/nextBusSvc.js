import angular from 'angular';

/**
 * @ngdoc service
 * @name sfDashApp.nextBusSvc
 * @description
 * # nextBus
 * Factory in the sfDashApp.
 */
angular.module('sfDashApp')
  .factory('nextBusSvc', ($http, $q, geolocation) => {
    const url = 'http://webservices.nextbus.com/service/publicXMLFeed';
    const sortPredictions = (stopRouteTags, predictions) => {
      const sortedList = [];
      angular.forEach(predictions, prediction => {
        const stopRouteTag = `${prediction._routeTag}|${prediction._stopTag}`;
        sortedList[stopRouteTags.indexOf(stopRouteTag)] = prediction;
      });
      return sortedList;
    };
    const mergeRouteData = routeData => {
      angular.forEach(routeData, route => {
        // map the stop tags
        const stopTags = {};
        angular.forEach(route.stop, stop => {
          stopTags[stop._tag] = stop;
        });

        angular.forEach(route.direction, direction => {
          for (let i = 0; i < direction.stop.length; i++) {
            const tag = direction.stop[i]._tag;
            direction.stop[i] = stopTags[tag];
          }
        });
      });
      return routeData;
    };

    return {
      getPredictions(stopRouteTags) {
        return $http.get(url, {
          params: {
            command: 'predictionsForMultiStops',
            a: 'sf-muni',
            stops: stopRouteTags,
            useShortTitles: true,
          },
        })
          .then(data => {
          // See config for xml->json arrays
            const { predictions } = data.data.body;
            return sortPredictions(stopRouteTags, predictions);
          });
      },
      getRouteConfig() {
        return $http.get(url, {
          cache: true,
          params: {
            command: 'routeConfig',
            a: 'sf-muni',
            useShortTitles: true,
          },
        })
          .then(data => mergeRouteData(data.data.body.route));
      },
      getStopsWithin(meters) {
        return $q.all([
          geolocation.getLocation(),
          this.getRouteConfig(),
        ]).then(promises => {
          /** Once we've got both the user's location and the route Data search */
          const stopResults = [];
          const currPosition = new google.maps.LatLng(
            promises[0].coords.latitude,
            promises[0].coords.longitude,
          );
          const routeConfig = promises[1];

          angular.forEach(routeConfig, route => {
            angular.forEach(route.direction, direction => {
              angular.forEach(direction.stop, stop => {
                /** Find stops that are within [meters] of the users position */
                const stopLatLng = new google.maps.LatLng(stop._lat, stop._lon);
                const distance = google.maps.geometry.spherical
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
                    stopTitle: stop._title,
                  });
                }
              });
            });
          });

          return stopResults;
        });
      },
    };
  });

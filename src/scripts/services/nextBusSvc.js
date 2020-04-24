import angular from 'angular';
import X2JS from 'x2js';


const URL = 'http://webservices.nextbus.com/service/publicXMLFeed';
const ensureArray = o => (Array.isArray(o) ? o : [o]);

const sortPredictions = (stopRouteTags, predictions) => {
  const sortedList = [];
  predictions.forEach(prediction => {
    const stopRouteTag = `${prediction._routeTag}|${prediction._stopTag}`;
    sortedList[stopRouteTags.indexOf(stopRouteTag)] = prediction;
  });
  return sortedList;
};

const mergeRouteData = routeData => {
  routeData.forEach(route => {
    // map the stop tags
    const stopTags = {};
    route.stop.forEach(stop => {
      stopTags[stop._tag] = stop;
    });

    route.direction.forEach(direction => {
      for (let i = 0; i < direction.stop.length; i++) { // eslint-disable-line no-plusplus
        const tag = direction.stop[i]._tag;
        direction.stop[i] = stopTags[tag];
      }
    });
  });
  return routeData;
};

angular.module('sfDashApp').factory(
  'nextBusSvc',
  ['$http', '$q', 'geolocation', ($http, $q, geolocation) => ({
    getPredictions(stopRouteTags) {
      return $http.get(URL, {
        params: {
          command: 'predictionsForMultiStops',
          a: 'sf-muni',
          stops: stopRouteTags,
          useShortTitles: true,
        },
      })
        .then(data => {
          const jsonObj = new X2JS().xml2js(data.data);
          const predictions = ensureArray(jsonObj.body.predictions);
          return sortPredictions(stopRouteTags, predictions);
        });
    },
    getRouteConfig() {
      return $http.get(URL, {
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

        routeConfig.forEach(route => {
          route.direction.forEach(direction => {
            direction.stop.forEach(stop => {
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
  })],
);
